const ethers = require("ethers");
const { erc20Abi } = require("../helpers");
require("dotenv").config();

const transferSelector = "0xa9059cbb";
const provider = new ethers.providers.JsonRpcProvider(
  process.env.sepolia_network
);
let filter;

const _fetchTransactionDetail = async (recipientAddress, blockNumber) => {
  const erc20Transfers = [];
  try {
    const block = await provider.getBlockWithTransactions(blockNumber);

    if (block && block.transactions) {
      for (const tx of block.transactions) {
        const toAddress = "0x" + tx.data.slice(34, 74);
        const tokenAmountHex = "0x" + tx.data.slice(74);
        const tokenAmount = parseInt(tokenAmountHex, 16);
        const tokenAddress = tx.to !== null ? tx.to : "";
        if (
          toAddress.toLowerCase() === recipientAddress.toLowerCase() &&
          tx.data.startsWith(transferSelector)
        ) {
          const contract = new ethers.Contract(
            tokenAddress,
            erc20Abi,
            provider
          );
          const tokenName = await contract.name();
          erc20Transfers.push({ ...tx, tokenName, tokenAmount, toAddress });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching ERC-20 transfers:", error);
  }
  return erc20Transfers;
};

const FetchTransactionDetail = async (recipientAddress) => {
  filter = provider.on("block", async (blockNumber) => {
    console.log(blockNumber);
    const result = await _fetchTransactionDetail(recipientAddress, blockNumber);
    if (result.length > 0) {
      console.log(result);
    } else {
      console.log(
        `No ERC-20 transfers found for ${recipientAddress} in Block ${blockNumber}.`
      );
    }
  });
};

const stopListening = async () => {
  filter.removeListener();
};

module.exports = { FetchTransactionDetail, stopListening };
