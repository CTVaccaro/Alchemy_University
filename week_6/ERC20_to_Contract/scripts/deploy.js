const hre = require("hardhat")

async function main () {

    const Bucket_Contract_Address = "0x873289a1aD6Cf024B927bd13bd183B264d274c68"
    const Bucket_abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"Winner","type":"event"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"drop","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    const [deployer] = await hre.ethers.getSigners(); console.log("Address deploying the contract: ", deployer.address)
    const Token = await hre.ethers.getContractFactory("Leone")
    const token = await Token.deploy(); console.log("Contract deployed at: ", token.address)

    const amount = hre.ethers.utils.parseUnits("50", 'ether')
    console.log("Token amount: ", amount)

    //Approve and TransferFrom
    console.log("\nApproving Transaction...")
    const tx = await token.approve(Bucket_Contract_Address, amount); await tx.wait() 

    console.log("\nSending Tokens...")
    const Bucket_contract = new hre.ethers.Contract(Bucket_Contract_Address, Bucket_abi, deployer)
    const tx_2 = await Bucket_contract.drop(token.address, amount); await tx_2.wait()

    console.log("Completed.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })