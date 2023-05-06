import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

//import * as http from 'http'; 

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      //debugger
      //with  metamask we have an acces to window.ethereum & to window.web3
      // metamask injects a global api into website
      // this api allows websites to request users, accounts, read data to blockchain
      //sign messages and transactions

      // console.log(window.web3);
      // console.log(window.ethereum);
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider);
      
      if (provider) {
        // provider.request({method: "eth_requestAccounts",})
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        });
      } else {
        console.error("Please, install metamask");
      }
      //let provider = null;

      // if (window.ethereum) {
      //   provider = window.ethereum;
      //   try {
      //     //await provider.enable();
      //     await provider.request({method: "eth_requestAccounts"})
      //   } catch {
      //     console.error("User denied Accounts Access!");
      //   }
      // } else if (window.web3) {
      //   provider = window.web3.currentProvider;
      // } else if (!process.env.production) {
      //   provider = new Web3.providers.HttpProvider("https://localhost:7545");
      // }
    };
    loadProvider();
  }, []);

  //console.log(web3Api.web3);
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <span>
              <strong className="mr-2">Account: </strong>
            </span>
            {account ? (
              <div>{account}</div>
            ) : (
              <button
                className="button is-small"
                onClick={() =>
                  web3Api.provider.request({ method: "eth_requestAccounts" })
                }
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="balance-view is size-2 my-4">
            <p className="is-size-3">
              Current Balance : <strong>10</strong>ETH
            </p>
          </div>
          {/* <button 
          className='btn mr-2'
          onClick={async ()=>{
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
            console.log(accounts);
          }} >
          Enable Ethereum
        </button> */}

          <button className="button is-link  mr-2">Donate</button>
          <button className="button is-primary ">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
