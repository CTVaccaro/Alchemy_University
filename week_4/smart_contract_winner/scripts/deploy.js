const ethers = require('ethers')
require('dotenv').config()

const { API_URL, PRIVATE_KEY } = process.env;

//TX proof after tx hash https://goerli.etherscan.io/tx/0xf6cbeb17386ce12ade70b2864e0cd7823edb7696217a9c6c30ca06e6901166d3

async function main() {

    let artifacts = await hre.artifacts.readArtifact("c_call") 
    const provider = new ethers.providers.JsonRpcProvider(API_URL) 
    let wallet = new ethers.Wallet(PRIVATE_KEY, provider)

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet) 
 
    let contract_call_point = await factory.deploy() 
    await contract_call_point.deployed()

    let tx = await contract_call_point.call_winner("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502"); console.log(tx)
}

main().then( () => process.exit(0))
.catch(error => {
    console.error(error)
    process.exit(1)
})