import React, { useState, useCallback, useMemo } from "react";
import { initContract, initWeb3 } from "@/app/utils";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [account, setAccount] = useState(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleConnectClick = async () => {
    try {
      // Initialize Web3
      const web3 = await initWeb3();
      // Set connected flag and provider
      setConnected(true);
      setProvider(web3);
      // Set account
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      // Display error message
      alert(`Error connecting wallet: ${error.message}`);
    }
  };

  const handleMintClick = async () => {
    try {
      // Initialize contract
      const contract = await initContract(provider);
      const accounts = await provider.eth.getAccounts();

      // Mint new NFT
      const mint = await contract.methods.safeMint(accounts[0]).send({
        from: accounts[0],
        value: provider.utils.toWei("0.05", "ether"),
      });

      // Display success message
      if (mint) {
        const tokenURI = await contract.methods
          .tokenURI(mint.events.Transfer.returnValues.tokenId)
          .call();
        alert(`NFT minted successfully! Token URI: ${tokenURI}`);
        return;
      }
      alert("NFT minted successfully!");
    } catch (error) {
      // Display error message
      alert(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div className={styles.contentBody}>
      {!connected ? (
        <div>
          <h1 className={styles.contentHeading}>
            Connect your wallet to mint a new NFT
          </h1>
          <button
            className={styles.button}
            type="button"
            onClick={handleConnectClick}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <h1 className={styles.contentHeading}>Mint a new NFT</h1>
          <p>{`Current connected Address: ${account}`}</p>

          <button
            className={styles.button}
            type="button"
            onClick={handleMintClick}
          >
            Mint NFT
          </button>
        </div>
      )}
    </div>
  );
}
