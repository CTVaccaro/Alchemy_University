const hre = require("hardhat");

async function main() {
  const deployer = await hre.ethers.getSigner(); console.log("Wallet account for address: ", deployer.address)
  console.log("Wallet balance: ", (await deployer.getBalance()).toString())

  const LionCoin_Contract = await hre.ethers.getContractFactory("LionCoin")
  const Contract_Obj = await LionCoin_Contract.deploy()
  console.log("Contract deployed at: ", Contract_Obj.address)

  const owner_balance = hre.ethers.utils.formatEther(
    (await Contract_Obj.balanceOf("0xed41f5d8e1c76bebc71e097d0a85c7f88accaa48"))
  )

  const sent = await Contract_Obj.transfer('0xca8a5d5ca68f650e3df2722bc281c0102545d2f2', 50); console.log(sent)

  console.log("Token supply: ", owner_balance)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});