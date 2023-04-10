import React, { useState } from "react";
import { initWeb3, initContract } from "../utils";

export default function Mint() {
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
      alert("NFT minted successfully!");
    } catch (error) {
      // Display error message
      alert(`Error minting NFT: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "95vh",
      }}
    >
      {!connected ? (
        <>
          <h1 style={{ padding: "20px" }}>
            Connect your wallet to mint a new NFT
          </h1>
          <button
            style={{
              padding: "10px",
              margin: "10px",
              backgroundColor: isHovering ? "white" : "black",
              color: isHovering ? "black" : "white",
              border: isHovering ? "1px solid black" : "1px solid white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type="button"
            onClick={handleConnectClick}
          >
            Connect Wallet
          </button>
        </>
      ) : (
        <>
          <h1 style={{ padding: "20px" }}>Mint a new NFT</h1>
          <p>{`Current connected Address: ${account}`}</p>
          <form>
            <button
              style={{
                padding: "10px",
                margin: "10px",
                backgroundColor: isHovering ? "white" : "black",
                color: isHovering ? "black" : "white",
                border: isHovering ? "1px solid black" : "1px solid white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              type="button"
              onClick={handleMintClick}
            >
              Mint NFT
            </button>
          </form>
        </>
      )}
    </div>
  );
}
