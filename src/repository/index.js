const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42"
);
const listenToTransactions = async () => {
  const block = await provider.getBlock(4293509);
  const result = await provider.getBlockWithTransactions(block.hash);
  const allTransactions = result.transactions;
  for (let i = 0; i < allTransactions.length; i++) {
    if (
      allTransactions[i].from === '0x0fadb24C9A7ac088c329C4Fa87730D3B2df2f525'
    ) {
      console.log(allTransactions[i]);
    }
    // console.log("in else");
  }
};
listenToTransactions()

// listenToTransactions("0x0fadb24c9a7ac088c329c4fa87730d3b2df2f525");

// module.exports = { listenToTransactions };
