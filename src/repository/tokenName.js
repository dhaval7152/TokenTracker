const ethers = require("ethers");

const erc20TransferSignature = "0xa9059cbb";

async function fetchErc20TransfersInBlock(
  recipientAddress,
  erc20ContractAddress,
  erc20Abi
) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/4ec1f52fc49f48fb9f8bac27b1348a42"
  );
  let blockNumber = await provider.getBlockNumber();

  try {
    const block = await provider.getBlockWithTransactions(blockNumber);

    if (block && block.transactions) {
      const erc20Transfers = [];

      for (const tx of block.transactions) {
        if (tx.data.startsWith(erc20TransferSignature)) {
          console.log(tx)
          const toAddress = "0x" + tx.data.slice(34, 74); // Extract the "to" address from input data
          const tokenAmountHex = "0x" + tx.data.slice(74); // Extract the token amount from input data
          const tokenAmount = parseInt(tokenAmountHex, 16); // Convert hex to a JavaScript number

          // Check if the "TO" address matches the recipient's address
          if (toAddress.toLowerCase() === recipientAddress.toLowerCase()) {
            // Fetch the token name from the contract (assuming the contract ABI is provided)
            let tokenName = "Unknown Token";
            if (erc20Abi && erc20ContractAddress) {
              const contract = new ethers.Contract(
                erc20ContractAddress,
                erc20Abi,
                provider
              );
              tokenName = await contract.name();
            }

            erc20Transfers.push({
              transactionHash: tx.hash,
              toAddress,
              tokenAmount: tokenAmount.toString(),
              tokenName,
            });
          }
        }
      }

      if (erc20Transfers.length > 0) {
        console.log(
          `ERC-20 Transfers in Block ${blockNumber} to ${recipientAddress}:`
        );
        erc20Transfers.forEach((transfer) => {
         console.log(transfer)
          console.log(`Transaction Hash: ${transfer.transactionHash}`);
          console.log(`To Address: ${transfer.toAddress}`);
          console.log(`Token Name: ${transfer.tokenName}`);
          console.log(`Token Amount: ${transfer.tokenAmount}`);
        });
      } else {
        console.log(
          `No ERC-20 transfers found to ${recipientAddress} in Block ${blockNumber}.`
        );
      }
    }
  } catch (error) {
    console.error("Error fetching ERC-20 transfers:", error);
  }
}

const recipientAddress = "0xdc6d6789a2c2a6d9d401ed0591c588c0134523b0"; // Replace with the recipient's address
const erc20ContractAddress = "0x162FA476fEd628cB692BD30c4cA3cD5E37e67786"; // Replace with the ERC-20 token contract address
const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
]; // Replace with the ABI of the ERC-20 token contract

setInterval(() => {
  fetchErc20TransfersInBlock(recipientAddress, erc20ContractAddress, erc20Abi);
}, 3000);