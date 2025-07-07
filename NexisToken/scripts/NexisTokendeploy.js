require("dotenv").config();
// import dotenv from "dotenv";
// dotenv.config();
require("@nomicfoundation/hardhat-verify");
const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
  
  // Contract deployment parameters
  const tokenName = "HYP Token";
  const tokenSymbol = "HYP";
  const tokenDecimals = 8;
  const initialSupply = 1000000000; // 1 billion tokens (raw number, not in wei)
  const owner = deployer.address; // You can change this to a different address if needed
  
  // Get the contract factory - CORRECTED CONTRACT NAME
  const NexisToken = await ethers.getContractFactory("NexisToken");
  
  // Deploy the contract
  console.log("\nDeploying NexisToken...");
  const nexisToken = await NexisToken.deploy(
    tokenName,
    tokenSymbol,
    tokenDecimals,
    initialSupply,
    owner
  );
  
  // Wait for deployment to complete
  await nexisToken.deployed();
  
  console.log("NexisToken deployed to:", nexisToken.address);
  console.log("Token Name:", tokenName);
  console.log("Token Symbol:", tokenSymbol);
  console.log("Token Decimals:", tokenDecimals);
  console.log("Initial Supply:", initialSupply);
  console.log("Owner:", owner);
  
  // Optional: Verify the contract on Etherscan (if you have API key configured)
  if (process.env.ETHERSCAN_API_KEY)
     {
    console.log("\nWaiting for block confirmations...");
    await nexisToken.deployTransaction.wait(5);

    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: nexisToken.address,
        constructorArguments: [
          tokenName,
          tokenSymbol,
          tokenDecimals,
          initialSupply,
          owner
        ],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Error verifying contract:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Export the deployment function for use in other scripts
module.exports = { main };