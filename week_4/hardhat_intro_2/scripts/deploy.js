const ethers = require('ethers')
require('dotenv').config()

async function main() {
    const url = process.env.TEST_GOERLI_URL

    let artifacts = await hre.artifacts.readArtifact("Faucet")

    const provider = new ethers.providers.JsonRpcProvider(url)

    let privateKey = process.env.TEST_PRIVATE_KEY

    let wallet = new ethers.Wallet(privateKey, provider)

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet)

    let faucet = await factory.deploy()

    console.log("Faucet address: ", faucet.address)

    await faucet.deployed()

    await faucet.withdraw(1)
}

main()
    .then( () => process.exit(0))
    .catch( error => {
        console.log(error);
        process.exit(1)
    })