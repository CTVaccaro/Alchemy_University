const {Alchemy, Network, Wallet, Utils} = require('alchemy-sdk')
require('dotenv').config()

const {TEST_PRIVATE_KEY, TEST_API_KEY} = process.env

const settings = {
    apiKey: TEST_API_KEY,
    network: Network.ETH_GOERLI
}

const alchemy = new Alchemy(settings)

let wallet = new Wallet(TEST_PRIVATE_KEY)

async function main() {
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        'latest'
    )

    let tx_data = {
        to: '0xf570fc9b787aedde2ec33ab503ba26e3209e8944',
        value: Utils.parseEther('0.002'), // 0.001 worth of ETH being sent
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 5,
    }

    let raw_tx = await wallet.signTransaction(tx_data); console.log("Raw Transaction: ", raw_tx)
    let tx = await alchemy.core.sendTransaction(raw_tx); console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)
}

main()