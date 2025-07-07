const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const token = await ethers.getContractAt("NexisToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

  // === REPLACE these addresses with your real recipient addresses ===
  const allocations = [
    { name: "Private Sale", address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", amount: ethers.utils.parseUnits("100000000", 18) },
    { name: "Public Sale", address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", amount: ethers.utils.parseUnits("200000000", 18) },
    { name: "Team & Advisors", address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", amount: ethers.utils.parseUnits("150000000", 18) },
    { name: "Strategic Partners", address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", amount: ethers.utils.parseUnits("60000000", 18) },
    { name: "Angel Sale", address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", amount: ethers.utils.parseUnits("40000000", 18) },
    { name: "Marketing", address: "0x976EA74026E726554dB657fA54763abd0C3a0aa9", amount: ethers.utils.parseUnits("150000000", 18) },
    { name: "Development & Operations", address: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", amount: ethers.utils.parseUnits("200000000", 18) },
    { name: "Exchange Liquidity Pool", address: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f", amount: ethers.utils.parseUnits("50000000", 18) },
    { name: "Metaverse Acquisition Vault", address: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", amount: ethers.utils.parseUnits("50000000", 18) },
  ];

  for (const alloc of allocations) {
    const tx = await token.transfer(alloc.address, alloc.amount);
    await tx.wait();
    console.log(`Transferred ${ethers.utils.formatUnits(alloc.amount, 18)} NTK to ${alloc.name} (${alloc.address})`);
  }
}

main().catch(console.error); 