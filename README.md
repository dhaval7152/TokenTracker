
# TokenTracker

TokenTracker is a real-time monitoring and tracking application for Ethereum blockchain transactions. It allows users to track all transactions, with a focus on ERC-20 token transfers, for a particular Ethereum wallet address across multiple Ethereum networks, including the mainnet and testnets.

TokenTracker is built using Node.js, leveraging libraries like Ethers.js for interacting with Ethereum nodes and smart contracts, and integrating with the Etherscan functions for transaction data retrieval. It provides a powerful tool for Ethereum users to monitor and analyze their ERC-20 token movements across multiple blockchain networks.

Features

1. Multi-Chain Support: The application supports multiple Ethereum networks, including mainnet, testnets, and other compatible chains. It uses the Networks array to initialize providers for each network.

2. Real-Time Transaction Monitoring:ets up listeners to detect new blocks and analyze transactions in real-time.

3. ERC-20 Token Transfer Detection: dentifies and filters out ERC-20 token transfer transactions for the specified wallet address.

4. Token Information Retrieval: Fetches and displays detailed information about the ERC-20 tokens involved in the transfers, such as token name, symbol, and decimal places.

5. Comprehensive Transaction Details: Provides a comprehensive view of all transactions, including block number, timestamp, and other relevant details.

6. Listener Management: Allows stopping the listening process for specific Ethereum networks when needed.







## API Reference

#### Get hello message

```http
GET /hello
```

Output:

Responds with a hello message.


#### Get transaction details for an account

```http
  GET /getToken/:account
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `account`      | `string` | **Required**. Ethereum account address to monitor transactions.|

Output:

Listens to Ethereum blocks for transactions involving the specified account address. Responds with "listening to block..." message.

#### Stop listening for a specific chain ID

```http
  GET /cancell/listener/:chainid

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chainid`      | `string` | **Required**. Chain ID to stop listening.  |

Output:

Stops listening to Ethereum blocks for the provided chain ID. Responds with "Stopped listening..." message.





## Installation



```bash
  git clone https://github.com/MD-Dhaval-Saxena/TokenTracker.git
  npm install i
  nodemon src/app.js
```

setup .env file
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`port` , `account`, `sepolia_network(rpc)`, `bsc_network(rpc)`,`etherum_Mainnet(rpc)`,`polygon_Mainnet(rpc)`,`contract_address(token address)`,`etherscan_key`,`privateKey`




## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://in.linkedin.com/in/dhaval-saxena-83b731192)

