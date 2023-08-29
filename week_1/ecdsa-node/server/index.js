const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const auth = require("./auth")

app.use(cors());
app.use(express.json());

const balances = {
  "04838c43f97285a556829473e06e6fd6d2b36d748468f8c374f6c6ac667699c7c11df37a9e179845516c550f8d289cbc393d762af5aba1078abe94e3cbdaecb5fe": 100,
  "04c83d279956af3f7da83d03ae5206210d8419615ca7829280a03f98e43b5e49a4cd09e473b176ba04cb5bb9f1a627d7867ca52cba6a92dbabc622bb37324d6288": 50,
  "04940c76e0d4077cbb60f1f0e1e6665744505b44acaf846b619cc800eb513d50d19f48446b0b215b5e99876556025833f3fb33fb940f5ed503ed9b92ce0052c51e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { signature, sender, recipient, amount } = req.body;

  const pubKey = req.body.sender; console.log(pubKey)
  const tx_sig = req.body.signature[0]; console.log(tx_sig)
  const tx_hash = req.body.signature[1]; console.log(tx_hash)

  const digital_sig = await auth.verify_sig(tx_sig, tx_hash, pubKey)
  console.log(digital_sig)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!digital_sig){
    res.status(400).send({ message: "TRANSACTION NOT AUTHORIZED" });
  }
   else if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
