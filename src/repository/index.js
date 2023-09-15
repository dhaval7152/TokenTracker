const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.sepolia_network);
const wallet = new ethers.Wallet(process.env.admin_private_key, provider);
(async () => {
  const block = await provider.getBlock("latest");
  console.log(block);
})();

fetch();
