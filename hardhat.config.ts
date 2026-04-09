import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    guapcoin: {
      url: "https://rpc-mainnet-1.guapcoinx.com",
      chainId: 71111,
      accounts: process.env.GUAPCOIN_PRIVATE_KEY ? [process.env.GUAPCOIN_PRIVATE_KEY] : [],
    },
  },
};

export default config;
