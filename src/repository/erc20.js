const ethers = require('ethers');

async function fetchLatestErc20TransfersToAddress() {
  const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42'); // Replace with your Ethereum node URL


// working searching data for erc20 in a block



  try {
    const latestBlockNumber = 4298447;
    const block = await provider.getBlockWithTransactions(latestBlockNumber);

    if (block && block.transactions) {
      const erc20TransfersToAddress = block.transactions.filter(tx => tx.to === '0x0b89A97E75B212799BAA8F5F2D9280F47FD2717f');

      if (erc20TransfersToAddress.length > 0) {
        console.log(`Latest ERC-20 Transfers to 0x0b89A97E75B212799BAA8F5F2D9280F47FD2717f (${latestBlockNumber}):`);
        erc20TransfersToAddress.forEach(tx => {
          console.log(`Transaction Hash: ${tx.hash}`);
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