const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  process.env.sepolia_network
);
const listenToTransactions = async (_address) => {
  const block = await provider.getBlock(4293509);
  const result = await provider.getBlockWithTransactions(block.hash);
  const allTransactions = result.transactions;
  for (let i = 0; i < allTransactions.length; i++) {
    if (allTransactions[i].from === _address) {
      console.log("done");
    }
  }
};

listenToTransactions("0x0fadb24c9a7ac088c329c4fa87730d3b2df2f525");

// module.exports = { listenToTransactions };
