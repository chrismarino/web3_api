const express = require('express')
const path = require('path')
const rocketPoolClient = require("@rocketpool/api");
const web3 = require("web3");
const PORT = process.env.PORT || 5001

// Connect to the Ethereum network using the HTTP provider
const holeskyUrl = 'https://rpc.holesky.ethpandaops.io';
const httpProvider = web3.providers.HttpProvider(holeskyUrl);
const web_instance = web3(httpProvider);
const RocketStorage = "0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1"; // Current Testnet Storage Contract
const rp = rocketPoolClient(web_instance, RocketStorage);

rp.contracts
  .get("rocketDepositPool")
  .then((rocketDepositPool) => rocketDepositPool.methods.getBalance().call())
  .then((balance) => {
    console.log(balance);
  });
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  // This is the code from the Rocket Pool docs
  //import Web3 from "web3";
  //import RocketPool from "@rocketpool/api";
  //import RocketPool from "rocketpool";
  //
  //const web3 = new Web3("https://rpc.holesky.ethpandaops.io");
  //const RocketStorage = "0x594Fb75D3dc2DFa0150Ad03F99F97817747dd4E1"; // Current Testnet Storage Contract
  //
  //// Connect to Rocket Pool
  //  const rp = new RocketPool(web3, RocketStorage);
