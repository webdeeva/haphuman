// Deploy HAPRegistry.sol to Guapcoin mainnet
// Usage: node scripts/deploy-guapcoin.mjs

import { createWalletClient, createPublicClient, http, defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { readFileSync } from "fs";
import solc from "solc";

const PRIVATE_KEY = process.env.GUAPCOIN_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error("Set GUAPCOIN_PRIVATE_KEY env var");
  process.exit(1);
}

// ─── Chain definition ─────────────────────────────────────────────────────────
const guapcoin = defineChain({
  id: 71111,
  name: "Guapcoin",
  nativeCurrency: { name: "Guapcoin", symbol: "GUAP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-mainnet-1.guapcoinx.com"] },
  },
});

// ─── Compile ──────────────────────────────────────────────────────────────────
const source = readFileSync("contracts/HAPRegistry.sol", "utf8");

const input = {
  language: "Solidity",
  sources: { "HAPRegistry.sol": { content: source } },
  settings: {
    outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } },
    optimizer: { enabled: true, runs: 200 },
    evmVersion: "paris",
  },
};

console.log("Compiling HAPRegistry.sol...");
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors?.some((e) => e.severity === "error")) {
  console.error("Compilation errors:", output.errors);
  process.exit(1);
}

const contract = output.contracts["HAPRegistry.sol"]["HAPRegistry"];
const abi = contract.abi;
const bytecode = "0x" + contract.evm.bytecode.object;
console.log("✓ Compiled. Bytecode size:", bytecode.length / 2 - 1, "bytes");

// ─── Deploy ───────────────────────────────────────────────────────────────────
const key = PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`;
const account = privateKeyToAccount(key);

const publicClient = createPublicClient({ chain: guapcoin, transport: http() });
const walletClient = createWalletClient({ account, chain: guapcoin, transport: http() });

const balance = await publicClient.getBalance({ address: account.address });
console.log(`\nDeployer: ${account.address}`);
console.log(`Balance:  ${Number(balance) / 1e18} GUAP`);

if (balance === 0n) {
  console.error("Wallet has no GUAP balance. Fund it before deploying.");
  process.exit(1);
}

console.log("\nDeploying HAPRegistry...");
const hash = await walletClient.deployContract({ abi, bytecode, account });
console.log("Deploy tx:", hash);

console.log("Waiting for confirmation...");
const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 1 });
const contractAddress = receipt.contractAddress;

console.log("\n✅ HAPRegistry deployed!");
console.log("   Address:", contractAddress);
console.log("   Block:  ", receipt.blockNumber.toString());
console.log("\n→ Add to Vercel env vars:");
console.log(`   HAP_REGISTRY_ADDRESS=${contractAddress}`);
