const secp = require("ethereum-cryptography/secp256k1.js")
const { hexToBytes, bytesToHex, utf8ToBytes } = require("ethereum-cryptography/utils.js")

async function verify_sig(sig, hash, pubKey){
    const sig_bytes = hexToBytes(sig)
    const hash_bytes = hexToBytes(hash)
    const pubKey_bytes = hexToBytes(pubKey)

    const verify = await secp.verify(sig_bytes, hash_bytes, pubKey_bytes)
    return verify
}

module.exports = { verify_sig }