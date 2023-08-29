require('dotenv').config
const { ethers } = require("ethers")

async function main() {
    console.log("123"); var block_transactions = []; var accounts = []
    const eth_provider = new ethers.providers.AlchemyProvider("mainnet", "")
    const last_block = await eth_provider.getBlockNumber(); console.log(last_block) 
    //What about callback hell ? :D
    eth_provider.getBlockWithTransactions(last_block).then( (res) => {
        res.transactions.map( x => { 
            block_transactions.push(x.hash)
            accounts.push(x.from)
        })
        console.log(block_transactions[1])
    }).then( () => {
        eth_provider.getTransaction(block_transactions[1]).then( (res) => {
            console.log(res)
        })}).then( () => {
            eth_provider.getBalance(accounts[1]).then( (res) => {
                console.log(ethers.utils.formatEther(res))
            })
        })
 
}

main()