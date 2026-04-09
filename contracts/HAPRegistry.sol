// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title HAPRegistry
/// @notice On-chain anchor registry for Human Authorship Protocol (HAP) records
/// @dev Deploy on Guapcoin (chain ID 71111). Stores SHA-256 hash → IPFS CID + creator + timestamp.
contract HAPRegistry {

    struct Anchor {
        string  cid;        // IPFS CID of the full HAP record
        address creator;    // wallet that submitted the anchor
        uint256 timestamp;  // block timestamp
    }

    /// recordHash (bytes32 sha-256) => Anchor
    mapping(bytes32 => Anchor) private _anchors;

    event HAPAnchored(
        bytes32 indexed recordHash,
        string          cid,
        address indexed creator,
        uint256         timestamp
    );

    /// @notice Anchor a HAP record on-chain
    /// @param recordHash SHA-256 hash of the canonical HAP record JSON (as bytes32)
    /// @param cid        IPFS CID where the full record is pinned
    function anchor(bytes32 recordHash, string calldata cid) external {
        require(_anchors[recordHash].timestamp == 0, "HAPRegistry: already anchored");
        require(bytes(cid).length > 0, "HAPRegistry: empty CID");

        _anchors[recordHash] = Anchor({
            cid:       cid,
            creator:   msg.sender,
            timestamp: block.timestamp
        });

        emit HAPAnchored(recordHash, cid, msg.sender, block.timestamp);
    }

    /// @notice Look up an existing anchor
    /// @param recordHash SHA-256 hash of the record
    function getAnchor(bytes32 recordHash)
        external
        view
        returns (Anchor memory)
    {
        return _anchors[recordHash];
    }

    /// @notice Check if a record has been anchored
    function isAnchored(bytes32 recordHash) external view returns (bool) {
        return _anchors[recordHash].timestamp != 0;
    }
}
