const ethers = require('ethers');

const erc20TransferSignature = '0xa9059cbb';

async function fetchErc20TransfersInBlock( recipientAddress) {
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42'); // Replace with your Ethereum node URL
    let blockNumber=await provider.getBlockNumber()

  try {
    const block = await provider.getBlockWithTransactions(blockNumber);

    if (block && block.transactions) {
      const erc20Transfers = [];

      for (const tx of block.transactions) {
        if (tx.data.startsWith(erc20TransferSignature)) {
          const toAddress = '0x' + tx.data.slice(34, 74); 
          const tokenAmountHex = '0x' + tx.data.slice(74); 
          const tokenAmount = parseInt(tokenAmountHex, 16); 

          if (toAddress.toLowerCase() === recipientAddress.toLowerCase()) {
          console.log(tx);

            erc20Transfers.push({
              transactionHash: tx.hash,
              toAddress,
              tokenAmount: tokenAmount.toString(),
            });
          }
        }
      }

      if (erc20Transfers.length > 0) {
        console.log(`ERC-20 Transfers in Block ${blockNumber} to ${recipientAddress}:`);
        erc20Transfers.forEach(transfer => {
          console.log(`Transaction Hash: ${transfer.transactionHash}`);
          console.log(`To Address: ${transfer.toAddress}`);
          console.log(`Token Amount: ${transfer.tokenAmount}`);
        });
      } else {
        console.log(`No ERC-20 transfers found to ${recipientAddress} in Block ${blockNumber}.`);
      }
    }
  } catch (error) {
    console.error('Error fetching ERC-20 transfers:', error);
  }
}

const recipientAddress = '0x0fadb24C9A7ac088c329C4Fa87730D3B2df2f525'; 


setInterval(() => {
    fetchErc20TransfersInBlock(recipientAddress);
}, 3000);
