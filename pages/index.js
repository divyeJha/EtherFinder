import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Image from 'next/image';

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState("");

  const failMessage = 'Please install MetaMask & connect your MetaMask.';

  const INFURA_ID = '1ea4772b25b44f98b8c87b97f0c67b8d';

  // 👇 Change network here (mainnet or sepolia)
  const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

  // fetch balance
  const fetchBalance = async (address) => {
    const bal = await provider.getBalance(address);
    setBalance(`${ethers.formatEther(bal)} ETH`);
  };

  const CWallet = async () => {
    if (!window.ethereum) {
      alert(failMessage);
      return;
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setCurrentAccount(accounts[0]);
    fetchBalance(accounts[0]);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          fetchBalance(accounts[0]);
        } else {
          setCurrentAccount("");
          setBalance("");
        }
      });
    }
  }, []);

  return (
    <div className="card-container">
      {currentAccount ? "" : <span className="pro">PRO</span>}
      <Image src="/creator.png" alt="profile" width={80} height={80} />
      <h3>Check Ether</h3>

      {!currentAccount ? (
        <div>
          <div className="message"><p>{failMessage}</p></div>
          <Image src="/ether.png" alt="Ethereum" width={100} height={100} />
          <p>Welcome to ether account balance checker</p>
        </div>
      ) : (
        <div>
          <h6>Verified <span className="tick">&#10004;</span></h6>
          <p>Ether account and balance Checker <br /> find account details</p>
          <div className="buttons">
            <button className="primary ghost" onClick={() => fetchBalance(currentAccount)}>
              Ether Account Details
            </button>
          </div>
        </div>
      )}

      {!currentAccount ? (
        <div className="buttons">
          <button className="primary" onClick={CWallet}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="skills">
          <h6>Your Ether</h6>
          <ul>
            <li>Account</li>
            <li>{currentAccount}</li>
            <li>Balance</li>
            <li>{balance}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
