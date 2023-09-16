const ethers = require('ethers');

// ERC-20 ABI for standard token functions
const erc20Abi = [
  // ... Include the standard ERC-20 functions ...
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  }
];

async function decodeErc20Transfer(transaction, provider) {
  try {
    const contract = new ethers.Contract(transaction.to, erc20Abi, provider);

    // Decode the transfer function data
    const decodedData = contract.interface.parseTransaction({ data: transaction.input });

    // Check if it's a transfer
    if (decodedData.name === "transfer") {
      const tokenName = await contract.name();
      const tokenSymbol = await contract.symbol();
      const toAddress = decodedData.args[0];
      const tokenAmount = decodedData.args[1].toString();

      return {
        tokenName,
        tokenSymbol,
        toAddress,
        tokenAmount,
      };
    }
  } catch (error) {
    return null;
  }
}

async function fetchLatestErc20TransfersToAddress() {
  const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42'); // Replace with your Ethereum node URL

  try {
    const latestBlockNumber = 4298447;
    const block = await provider.getBlockWithTransactions(latestBlockNumber);

    if (block && block.transactions) {
      const erc20Transfers = [];

      for (const tx of block.transactions) {
        if (tx.to === '0x0b89A97E75B212799BAA8F5F2D9280F47FD2717f') {
          const erc20Info = await decodeErc20Transfer(tx, provider);
          if (erc20Info) {
            erc20Transfers.push({ tx, erc20Info });
          }
        }
      }

      if (erc20Transfers.length > 0) {
        console.log(`Latest ERC-20 Transfers to 0x0b89A97E75B212799BAA8F5F2D9280F47FD2717f (${latestBlockNumber}):`);
        erc20Transfers.forEach(({ tx, erc20Info }) => {
          console.log(`Transaction Hash: ${tx.hash}`);
          console.log(`Token Name: ${erc20Info.tokenName}`);
          console.log(`Token Symbol: ${erc20Info.tokenSymbol}`);
          console.log(`To Address: ${erc20Info.toAddress}`);
          console.log(`Token Amount: ${erc20Info.tokenAmount}`);
        });
      } else {
        console.log(`No ERC-20 transfers found to address 0x0b89A97E75B212799BAA8F5F2D9280F47FD2717f in the latest block.`);
      }
    }
  } catch (error) {
    console.error('Error fetching ERC-20 transfers:', error);
  }
}


fetchLatestErc20TransfersToAddress();
