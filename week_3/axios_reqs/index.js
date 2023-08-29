const axios = require('axios')
const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/fB1pDMy8sRM3u2oaPridATMPmxvNCEym"

axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByHash",
    params: [
        "0x66a42208768b7ec181a66b820a337b5f95ff81d53b35359cb2b2c0c1fcac2555",
        false
    ]
}).then((response) => {
    console.log(response.data.result)
})