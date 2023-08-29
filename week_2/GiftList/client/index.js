const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  //Choose the name
  const _gift_name = "Fistic_Mistic"; console.log(_gift_name) //#L55 

  //Create Merkle Tree
  const M = new MerkleTree(niceList)

  // Create Proof + Root
  const index = niceList.findIndex(search_val => search_val === _gift_name)
  const _proof = JSON.stringify(M.getProof(index)); console.log(_proof)
  const _root = M.getRoot(); console.log(_root)

  //Send to server Proof + Requested Name + Root
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: _proof,
    root: _root,
    gift_name: _gift_name
  });

  console.log({ gift });
}

main();