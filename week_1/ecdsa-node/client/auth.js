import * as secp from "ethereum-cryptography/secp256k1.js"
import { hexToBytes, bytesToHex, utf8ToBytes } from "ethereum-cryptography/utils.js"
import { keccak256 } from "ethereum-cryptography/keccak.js"

//hash clear text data, encrypt with priv_key
//append data to be sent in following format: hash|enc_data|Pub_Key
const users = {
    "user_1":
        {
    "priv_key":"056419cdfb4d93a3ff83bf79d42f40ef2645506112ee7af3bc147c8d9a11722d",
    "pub_key":"04838c43f97285a556829473e06e6fd6d2b36d748468f8c374f6c6ac667699c7c11df37a9e179845516c550f8d289cbc393d762af5aba1078abe94e3cbdaecb5fe"
        }    
    ,
    "user_2":
        {
    "priv_key":"972f76cbec1f5c3cc37c7fa7a207908ea2d387cd024976651a2dbb635189a8f9",
    "pub_key":"04c83d279956af3f7da83d03ae5206210d8419615ca7829280a03f98e43b5e49a4cd09e473b176ba04cb5bb9f1a627d7867ca52cba6a92dbabc622bb37324d6288"
        }    
    ,
    "user_3":
        {
    "priv_key":"681d3e1bd3e056dfca32e8586be88446b128a57cc791135daba6ed2435756eff",
    "pub_key":"04940c76e0d4077cbb60f1f0e1e6665744505b44acaf846b619cc800eb513d50d19f48446b0b215b5e99876556025833f3fb33fb940f5ed503ed9b92ce0052c51e"
        }    
}

function get_priv_key(pub){
for (const user in users){
if(users[user].pub_key === pub)
    return users[user].priv_key
    }
}

async function sign_tx(clear_data){
    let privKey = get_priv_key(clear_data.sender)
    let clear_data_str = JSON.stringify(clear_data)
    const keccak_hash = keccak256(utf8ToBytes(clear_data_str))
    const sig = await secp.sign(keccak_hash, hexToBytes(privKey))
    return [bytesToHex(sig), bytesToHex(keccak_hash)]
    }

    /* Test stuff
    const data = {
        sender: "04940c76e0d4077cbb60f1f0e1e6665744505b44acaf846b619cc800eb513d50d19f48446b0b215b5e99876556025833f3fb33fb940f5ed503ed9b92ce0052c51e",
        amount: parseInt("12"),
        recipient: "Fistic"
      }
const sig = await sign_tx(data)
console.log(sig)
*/
export default sign_tx 
//keys are generated and saved in a clear-text file just for testing purposes.
//Each user would have the priv key saved securely in a cold / hot wallet