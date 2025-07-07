const { ethers } = require("hardhat");

async function main() {
  // Get the signers (accounts)
  const [deployer] = await ethers.getSigners();
  
  console.log("Deployer address:", deployer.address);
  console.log("Deployer balance:", ethers.formatEther(await deployer.getBalance()), "ETH");
  
  // If you have deployed the contract, you can also check the token balance
  // Replace with your actual contract address
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  
  if (contractAddress !== "YOUR_CONTRACT_ADDRESS_HERE") {
    const tokenContract = await ethers.getContractAt("NexisToken", contractAddress);
    const tokenBalance = await tokenContract.balanceOf(deployer.address);
    const totalSupply = await tokenContract.totalSupply();
    
    console.log("\nToken Contract Info:");
    console.log("Contract address:", contractAddress);
    console.log("Deployer token balance:", ethers.formatEther(tokenBalance), "NTK");
    console.log("Total supply:", ethers.formatEther(totalSupply), "NTK");
    console.log("Percentage owned by deployer:", (Number(tokenBalance) / Number(totalSupply) * 100).toFixed(2) + "%");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 