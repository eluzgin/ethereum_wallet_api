const db = require('mongodb');
const { ethers } = require("ethers");

const eth_url = "https://eth-goerli.alchemyapi.io/v2/Vi2_tOQotYnyi56sOsDJWW2vziB_NCuf";
const provider = new ethers.providers.JsonRpcProvider(eth_url);

var db_url = "mongodb://mongodb_container:27017/wallet?useUnifiedTopology=true";
var MongoClient = require('mongodb').MongoClient;

exports.get_balance = async function(req, res) {
  let address = req.body.address;
  try {
    ethers.utils.getAddress(address);
  } catch(err) {
    res.json(err);
  }
  let balance = await provider.getBalance(address);
  res.json(ethers.utils.formatEther(balance));
}

exports.get_transaction = async function(req, res) {
  let hash = req.body.hash;
  provider.getTransaction(hash).then(function(transaction) {
    res.json(transaction);
  });
}

exports.get_transaction_receipt = async function(req, res) {
  let hash = req.body.hash;
  provider.getTransactionReceipt(hash).then(function(transactionReceipt) {
    res.json(transactionReceipt);
  });
}

exports.get_hw_balance = async function(req, res) {
  MongoClient.connect(db_url, function(err, client) {
      if (err) throw err;

      var db = client.db('wallet');
      var hw = db.collection("hotwallet");

      hw.findOne({}, async function(err, result) {
          if (err) throw err;
          if (result) {
            let balance = await provider.getBalance(result.address);
            let response = {
              "address": result.address,
              "balance": ethers.utils.formatEther(balance)
            }
            res.json(response);
          } else {
            // This should never happen:
            res.json("Hotwallet not found!");
          }
      });
  });
};

exports.send = async function(req, res) {
  const address = req.body.address;
  const amount = req.body.amount;
  let gasLimit = req.body.gas_limit;
  if(!gasLimit) {
    gasLimit = 100000; // DEFAULT GAS LIMIT
  }
  try {
    ethers.utils.getAddress(address);
  } catch(err) {
    res.json(err);
  }
  MongoClient.connect(db_url, function(err, client) {
      if (err) throw err;

      var db = client.db('wallet');
      var hw = db.collection("hotwallet");

      hw.findOne({}, async function(err, result) {
          if (err) throw err;
          if (result) {
            let balance = await provider.getBalance(result.address);
            if(balance <= amount) {
              res.json("Insufficient hotwallet balance for transfer: "+balance);
            }
            let wallet = new ethers.Wallet(result.privateKey);
            let walletSigner = wallet.connect(provider);
            let gasPrice = provider.getGasPrice();
            try {
              const tx = {
                from: result.address,
                to: address,
                value: ethers.utils.parseEther(amount.toString()),
                nonce: provider.getTransactionCount(result.address, "latest"),
                gasLimit: ethers.utils.hexlify(gasLimit),
                gasPrice: gasPrice,
              };
              walletSigner.sendTransaction(tx).then((transaction) => {
                res.json(transaction)
              });
            } catch(err) {
              res.json(err);
            }
          } else {
            // This should never happen:
            res.json("Hotwallet not found!");
          }
      });
  });
};
