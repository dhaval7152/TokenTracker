const ethers = require('ethers');

// ERC-20 Transfer Function Signature: 0xa9059cbb
const erc20TransferSignature = '0xa9059cbb';

async function fetchErc20TransfersInBlock(blockNumber) {
  const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42'); // Replace with your Ethereum node URL

  try {
    const block = await provider.getBlockWithTransactions(blockNumber);

    if (block && block.transactions) {
      const erc20Transfers = [];

      for (const tx of block.transactions) {
        if (tx.data.startsWith(erc20TransferSignature)) {
          const toAddress = '0x' + tx.data.slice(34, 74); // Extract the "to" address from input data
          const tokenAmountHex = '0x' + tx.data.slice(74); // Extract the token amount from input data
        const tokenAmount = parseInt(tokenAmountHex, 16); // Convert hex to a JavaScript number


          erc20Transfers.push({
            transactionHash: tx.hash,
            toAddress,
            tokenAmount: tokenAmount.toString(),
          });
        }
      }

      if (erc20Transfers.length > 0) {
        console.log(`ERC-20 Transfers in Block ${blockNumber}:`);
        erc20Transfers.forEach(transfer => {
          console.log(`Transaction Hash: ${transfer.transactionHash}`);
          console.log(`To Address: ${transfer.toAddress}`);
          console.log(`Token Amount: ${transfer.tokenAmount}`);
        });
      } else {
        console.log(`No ERC-20 transfers found in Block ${blockNumber}.`);
      }
    }
  } catch (error) {
    console.error('Error fetching ERC-20 transfers:', error);
  }
}


fetchErc20TransfersInBlock(4298494);
