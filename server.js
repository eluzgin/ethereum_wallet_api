const db = require('mongodb');
const { ethers } = require("ethers");

var db_url = "mongodb://mongodb_container:27017/wallet?useUnifiedTopology=true";
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(db_url, function(err, client) {
    if (err) throw err;

    var db = client.db('wallet');
    var hw = db.collection("hotwallet");

    hw.findOne({}, function(err, result) {
        if (err) throw err;
        if (result) {
          console.log("Found hotwallet: "+result.address);
        } else {
          let ethWallet = ethers.Wallet.createRandom();
          var record = {
            "address": ethWallet.address,
            "privateKey": ethWallet._signingKey().privateKey
          }
          console.log("Generated new hotwallet: "+ethWallet.address);
          hw.insertOne(record);
        }
    });
});

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/Routes');
routes(app);

app.listen(port);

console.log('Ethereum Wallet API server started on: ' + port);
