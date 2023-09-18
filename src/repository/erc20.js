const ethers = require('ethers');

async function fetchLatestErc20TransfersToAddress() {
  const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42'); // Replace with your Ethereum node URL


// working searching data for erc20 in a block



  try {
    const latestBlockNumber = 4311701
    ;
    const block = await provider.getBlockWithTransactions(latestBlockNumber);

    if (block && block.transactions) {
      const erc20TransfersToAddress = block.transactions.filter(tx => tx.to === '0x24d15b56badfe7266E6cA4A74aDA2218639010ef');

      if (erc20TransfersToAddress.length > 0) {
        console.log(`Latest ERC-20 Transfers to 0x24d15b56badfe7266E6cA4A74aDA2218639010ef (${latestBlockNumber}):`);
        erc20TransfersToAddress.forEach(tx => {
          console.log(`Transaction Hash: ${tx.hash}`);
        });
      } else {
        console.log(`No ERC-20 transfers found to address 0x24d15b56badfe7266E6cA4A74aDA2218639010ef in the latest block.`);
      }
    }
  } catch (error) {
    console.error('Error fetching ERC-20 transfers:', error);
  }
}


fetchLatestErc20TransfersToAddress();