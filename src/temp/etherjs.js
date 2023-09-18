const ethers = require('ethers');

async function fetchLatestTransactions(address) {
  const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42'); // Replace with your Ethereum node URL
  
  try {
    // const latestBlockNumber = await provider.getBlockNumber();
    const block = await provider.getBlockWithTransactions(
      4298270);

    if (block && block.transactions) {
      console.log(block.transactions)
      const transactions = block.transactions.filter(tx => tx.to === address.toLowerCase());

      if (transactions.length > 0) {
        console.log(`Latest Block (${latestBlockNumber}) Transactions:`);
        transactions.forEach(tx => {
          console.log(`Transaction Hash: ${tx.hash}`);
        });
      } else {
        console.log(`No transactions found for address ${address} in the latest block.`);
      }
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

const yourAddress = '0xADE74646268F5feD49A1681a955578D4BDa3A37e';

fetchLatestTransactions(yourAddress);
