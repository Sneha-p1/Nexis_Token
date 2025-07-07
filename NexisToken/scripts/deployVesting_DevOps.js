const { ethers } = require("hardhat");

async function main() {
  const beneficiary = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"; // Dev & Ops address
  const start = Math.floor(Date.now() / 1000) + 60; // Vesting starts in 1 minute
  const duration = 12 * 30 * 24 * 60 * 60; // 12 months

  const VestingWallet = await ethers.getContractFactory("VestingWallet");
  const vestingWallet = await VestingWallet.deploy(beneficiary, start, duration);
  await vestingWallet.deployed();
  console.log("Dev & Ops VestingWallet deployed at:", vestingWallet.address);

  const token = await ethers.getContractAt("NexisToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const amount = ethers.utils.parseUnits("200000000", 18);
  const tx = await token.transfer(vestingWallet.address, amount);
  await tx.wait();
  console.log(`Transferred ${ethers.utils.formatUnits(amount, 18)} NTK to Dev & Ops vesting wallet.`);
}

main().catch(console.error); 