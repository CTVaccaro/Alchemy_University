const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix (Get it from example.js -> getRoot())
// The only data saved on the server
const MERKLE_ROOT = '40a9db0a20a5bfa9052254ca1a3979b9d588360edeb96bbe6cca6dee99d271c2';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  const _proof = JSON.parse(body.proof)
  const _root = body.root
  const _gift_name = body.gift_name
  // TODO: prove that a name is in the list // verifyProof(proof, leaf, root)
  const isInTheList = verifyProof(_proof, _gift_name, _root);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
