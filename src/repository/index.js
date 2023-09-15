const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.sepolia_network);
console.log(process.env.sepolia_network);
const listnToTransaction = async (addressToWatch) => {
  const filter = {
    address: addressToWatch,
  };
  provider.on(filter, (log, event) => {
    console.log("Incomming transaction detected: ");
    console.log(log);
    console.log("Event: ", event);
  });
};

listnToTransaction("0x80A344d8095d099bb72e6298aA8bA2C9E82A4Cbe");
