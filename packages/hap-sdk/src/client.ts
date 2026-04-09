// @hap/sdk — HAPClient

import type {
  HAPClientOptions,
  CreateRecordRequest,
  CreateRecordResponse,
  AnchorRecordResponse,
  HAPRecord,
} from "./types";

export class HAPClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(options: HAPClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.headers = {
      "Content-Type": "application/json",
      ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {}),
    };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: { ...this.headers, ...(init?.headers ?? {}) },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`HAP API error ${res.status}: ${body}`);
    }

    return res.json() as Promise<T>;
  }

  /**
   * Create a new HAP authorship record.
   * Optionally pin to IPFS by setting pin_to_ipfs: true.
   *
   * @example
   * const { record } = await hap.createRecord({
   *   recipe: { style: "lo-fi hip hop", tone: "melancholic", bpm_min: 70, bpm_max: 85 },
   *   voice: { voice_id: "hap_voice_001", voice_permissions: { licensed_uses: ["music_generation"], prohibited_uses: ["advertising"], expiry: "2027-01-01T00:00:00Z", revocable: true } },
   *   inputs: { lyrics: "Through the noise I remain", note: "Climax at 1:45" },
   *   iterations: [
   *     { version: "v1", selected: false, notes: "Tempo too fast" },
   *     { version: "v2", selected: true, notes: "Perfect. The space is right." },
   *   ],
   *   pin_to_ipfs: true,
   * });
   */
  async createRecord(req: CreateRecordRequest): Promise<CreateRecordResponse> {
    return this.request<CreateRecordResponse>("/api/v1/records", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  /**
   * Fetch a HAP record from IPFS by its CID.
   */
  async getRecord(cid: string): Promise<{ record: HAPRecord }> {
    return this.request<{ record: HAPRecord }>(`/api/v1/records/${cid}`);
  }

  /**
   * Anchor an IPFS-pinned record to the Guapcoin blockchain.
   * The record must be pinned (have an IPFS CID) before anchoring.
   */
  async anchorRecord(cid: string): Promise<AnchorRecordResponse> {
    return this.request<AnchorRecordResponse>(`/api/v1/records/${cid}/anchor`, {
      method: "POST",
    });
  }

  /**
   * Retrieve the HAP JSON Schema 2020-12 spec.
   */
  async getSchema(): Promise<Record<string, unknown>> {
    return this.request<Record<string, unknown>>("/api/v1/schemas");
  }
}
