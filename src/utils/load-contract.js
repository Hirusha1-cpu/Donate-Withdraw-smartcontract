//const contract = require("@truffle/contract")
// import Faucet from "./abis/contracts/Faucet.json"
// import Web3 from "web3";
import contract from "@nomiclabs/truffle-contract";
//import * as http from 'http';
//const contract = Npm.require('@truffle/contract')

export const loadContract = async (name, provider) => {
  // const Faucet = await fetch(`/contracts/${name}.json`);

  // window.web3 = new Web3(provider);
  // const web3 = window.web3;
  // const networkId = await web3.eth.net.getId();

  // const networkData = Faucet.networks[networkId];
  // const abi = Faucet.abi;
  // const address = networkData.address;
  // const contract = new web3.eth.Contract(abi, address);
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  const _contract = contract(Artifact);
  _contract.setProvider(provider);

  //   window.web3 = new Web3(provider);
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   const networkData = Faucet.networks[networkId];
  //   const address = networkData.address;
  //   const _contract = new web3.eth.Contract(Faucet.abi, address);

  const deployedContract = await _contract.deployed();

  return deployedContract;
};
