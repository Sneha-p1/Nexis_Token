const { ethers } = require("hardhat");

async function main() {
  const beneficiary = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Private Sale address
  const start = Math.floor(Date.now() / 1000) + 60; // Vesting starts in 1 minute
  const duration = 12 * 30 * 24 * 60 * 60; // 12 months

  const VestingWallet = await ethers.getContractFactory("VestingWallet");
  const vestingWallet = await VestingWallet.deploy(beneficiary, start, duration);
  await vestingWallet.deployed();
  console.log("Private Sale VestingWallet deployed at:", vestingWallet.address);

  const token = await ethers.getContractAt("NexisToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const amount = ethers.utils.parseUnits("100000000", 18);
  const tx = await token.transfer(vestingWallet.address, amount);
  await tx.wait();
  console.log(`Transferred ${ethers.utils.formatUnits(amount, 18)} NTK to Private Sale vesting wallet.`);
}

main().catch(console.error); 