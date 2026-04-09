// HAP v2.1 — Guapcoin EVM integration (viem)

import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
  type Hash,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createHash } from "crypto";
import type { HAPRecord } from "./types";

// ─── Chain definition ─────────────────────────────────────────────────────────

export const guapcoin = defineChain({
  id: 71111,
  name: "Guapcoin",
  nativeCurrency: {
    name: "Guapcoin",
    symbol: "GUAP",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        process.env.GUAPCOIN_RPC_URL ?? "https://rpc-mainnet-1.guapcoinx.com",
        "https://rpc-mainnet-2.guapcoinx.com",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "GuapcoinScan",
      url: process.env.GUAPCOIN_EXPLORER_URL ?? "https://scan.guapcoinx.com",
    },
  },
});

// ─── HAPRegistry ABI (minimal — matches HAPRegistry.sol) ─────────────────────

export const HAP_REGISTRY_ABI = [
  {
    type: "function",
    name: "anchor",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recordHash", type: "bytes32" },
      { name: "cid", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "HAPAnchored",
    inputs: [
      { name: "recordHash", type: "bytes32", indexed: true },
      { name: "cid", type: "string", indexed: false },
      { name: "creator", type: "address", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
  {
    type: "function",
    name: "getAnchor",
    stateMutability: "view",
    inputs: [{ name: "recordHash", type: "bytes32" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "cid", type: "string" },
          { name: "creator", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function hashRecordBytes32(record: HAPRecord): `0x${string}` {
  const json = JSON.stringify(record, Object.keys(record).sort());
  const hex = createHash("sha256").update(json).digest("hex");
  return `0x${hex}`;
}

function getPrivateKey(): `0x${string}` {
  const key = (process.env.GUAPCOIN_PRIVATE_KEY ?? "").trim().replace(/^0x/, "");
  if (!key) throw new Error("GUAPCOIN_PRIVATE_KEY environment variable is not set");
  if (!/^[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error(`GUAPCOIN_PRIVATE_KEY invalid: expected 64 hex chars, got ${key.length}`);
  }
  return `0x${key}`;
}

function getRegistryAddress(): `0x${string}` {
  const addr = process.env.HAP_REGISTRY_ADDRESS;
  if (!addr) throw new Error("HAP_REGISTRY_ADDRESS environment variable is not set");
  return addr as `0x${string}`;
}

// ─── Anchor a record on Guapcoin ─────────────────────────────────────────────

export async function anchorOnGuapcoin(
  record: HAPRecord,
  cid: string
): Promise<{
  transaction_hash: string;
  anchored_hash: string;
  block_number?: number;
  timestamp: string;
}> {
  const account = privateKeyToAccount(getPrivateKey());
  const registryAddress = getRegistryAddress();

  const walletClient = createWalletClient({
    account,
    chain: guapcoin,
    transport: http(),
  });

  const publicClient = createPublicClient({
    chain: guapcoin,
    transport: http(),
  });

  const recordHash = hashRecordBytes32(record);

  const txHash: Hash = await walletClient.writeContract({
    address: registryAddress,
    abi: HAP_REGISTRY_ABI,
    functionName: "anchor",
    args: [recordHash, cid],
  });

  // Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
    confirmations: 1,
  });

  return {
    transaction_hash: txHash,
    anchored_hash: `sha256:${recordHash.slice(2)}`,
    block_number: Number(receipt.blockNumber),
    timestamp: new Date().toISOString(),
  };
}
