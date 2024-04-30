const ethers = require("ethers");
const { erc20Abi, Networks } = require("../helpers");
require("dotenv").config();
const { sendEmails } = require("../mail_server");
const transferSelector = "0xa9059cbb";

const providers = [];
let filters = [];

Networks.map(async (val, index) => {
  providers[index] = new ethers.providers.JsonRpcProvider(val);
});

const _fetchTransactionDetail = async (
  recipientAddress,
  blockNumber,
  provider
  ) => {
  const erc20Transfers = [];
  try {
    const block = await provider.getBlockWithTransactions(blockNumber);
    const { chainId } = await provider.getNetwork();
    console.log(`${blockNumber} of  ${chainId} `);
    console.log(blockNumber);

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
          const tokenSymbol = await contract.symbol();
          const tokenDecimal = await contract.decimals();

          erc20Transfers.push({
            ...tx,
            tokenName,
            tokenSymbol,
            tokenDecimal,
            tokenAmount,
            toAddress,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching ERC-20 transfers:", error);
  }
  return erc20Transfers;
};

const FetchTransactionDetail = async (recipientAddress) => {  
  providers.forEach((provider, index) => {
    filters[index] = provider.on("block", async (blockNumber) => {
      const result = await _fetchTransactionDetail(
        recipientAddress,
        blockNumber,
        provider
      );
      if (result.length > 0) {
        console.log(result);
        // sendEmails(`The Latest Transaction to Your wallet:
        // Token name: ${result[0].tokenName},Token Received: ${result[0].tokenAmount}`);
      } else {
        return;
      }
    });
  });
};

const stopListening = async (_chainId) => {
  providers.forEach(async (provider, index) => {
    const { chainId } = await provider.getNetwork();
    if (_chainId === chainId.toString()) {
      filters[index].removeListener();
    }
  });
};

module.exports = { FetchTransactionDetail, stopListening };
// //