import { ethers } from "hardhat";

async function main() {
  console.log("Deploying HAPRegistry to Guapcoin (chain ID 71111)...");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "GUAP");

  const HAPRegistry = await ethers.getContractFactory("HAPRegistry");
  const registry = await HAPRegistry.deploy();
  await registry.waitForDeployment();

  const address = await registry.getAddress();
  console.log("\n✓ HAPRegistry deployed to:", address);
  console.log("  Set this as HAP_REGISTRY_ADDRESS in Vercel env vars");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
