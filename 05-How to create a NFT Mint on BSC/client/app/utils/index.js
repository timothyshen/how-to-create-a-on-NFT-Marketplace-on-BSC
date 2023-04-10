import Web3 from "web3";
import NFTCollection from "./contracts/NFTCollection.json";

export const initWeb3 = async () => {
  if (process.env.MODE == "development") {
    return new Web3(process.env.LOCAL_NODE); //for local development
  } else if (typeof window.web3 === "undefined") {
    alert("Install MetaMask");
  } else {
    console.log(window.ethereum);
    let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    console.log(web3);
    await window.ethereum.enable();
    return web3;
  }
};

export const initContract = async (web3) => {
  return new web3.eth.Contract(NFTCollection.abi, process.env.CONTRACTADDRESS);
};
