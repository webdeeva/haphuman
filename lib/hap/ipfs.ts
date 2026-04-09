// HAP v2.1 — Pinata IPFS integration

import type { HAPRecord } from "./types";

const PINATA_API = "https://api.pinata.cloud";

function getJWT(): string {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) throw new Error("PINATA_JWT environment variable is not set");
  return jwt;
}

export async function pinRecord(record: HAPRecord): Promise<string> {
  const jwt = getJWT();

  const body = {
    pinataContent: record,
    pinataMetadata: {
      name: record.record_id,
      keyvalues: {
        hap_version: record.hap_version,
        domain_profile: record.domain_profile,
        hcs_tier: record.hcs_tier,
        contribution_score: String(record.contribution_score),
        created_at: record.created_at,
      },
    },
    pinataOptions: {
      cidVersion: 1,
    },
  };

  const res = await fetch(`${PINATA_API}/pinning/pinJSONToIPFS`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Pinata error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as { IpfsHash: string };
  return data.IpfsHash;
}

export async function fetchRecord(cid: string): Promise<HAPRecord> {
  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
  if (!res.ok) throw new Error(`IPFS fetch error ${res.status} for CID ${cid}`);
  return res.json() as Promise<HAPRecord>;
}

export function ipfsUrl(cid: string): string {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
