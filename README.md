# BSC NFT Marketplace

# Overview

An easy-to-understand tutorial for newbies to develop NFT marketplace on BNB Smart Chain.

# What You Will Learn

1. Set up a NFT mint Dapps using BSC Truffle box
2. Deploying the NFT contract to Binance Smart Chain
3. Developing the frontend
4. Integrating the contract with the frontend
5. Testing the Minting process
6. Launching the marketplace

# What You Will Learn

1. Set up a NFT mint Dapps using BSC Truffle box
2. Deploying the NFT contract to Binance Smart Chain
3. Developing the frontend
4. Integrating the contract with the frontend
5. Testing the Minting process
6. Launching the marketplace

# Technology Stack

- Node v16.19.1
- NPM v8.19.3
- Nextjs
- Truffle versions
    - Truffle v5.8.1 (core: 5.8.1)
    - Ganache
    - Solidity
    - Web3.js v1.6.1

# Setup

- **Clone the repository** `gh repo clone https://github.com/bnb-chain/bnb-chain-tutorial`
- **Change the current directory** `cd 05-Hello World Full Stack dApp on BSC`
- **Install all the dependencies** `npm install`
- Create a `.secret` file with the secret phrase of MetaMask.
- **Compile Smart Contracts** `truffle compile`
- **Migrate Smart Contracts** `truffle migrate --reset --network bscTestnet`
- **To run the frontend first run** `cd client`
- **Install all the dependencies** `npm install`
- **Create build** `npm run build`
- **Run the application** `npm run dev`

# Available Scripts

```bash
Compile:              truffle compile
Migrate:              truffle migrate
Test contracts:       truffle test
Test dapp:            cd client && npm test
Run dev server:       cd client && npm run start
Build for production: cd client && npm run build
```

# Structure

```bash
NFT Mint.
|   .env
|   .gitattributes
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   truffle-config.js
|   yarn.lock
|            
+---client
|   \---app
|       \---components
|               MintButton.js \\ The main minting logic component
|   \---utils \\ all utilities
|       \---contracts       
|               NFTCollection.json \\ NFTCollection.sol's abi
|       |---index.js \\ utilities functions
|.  \---page
|.      |---index.js \\ main page for the mint
|
+---contracts
|       NFTCollection.sol
|       
+---migrations
|       1_deploy_contracts.js
|                    
+---test
|       mynftTest.js       
|
```

# Explanation

The entire project consists of two parts: the contract and the frontend. In the Web3 space or the blockchain world, we tend to replace the traditional backend with the smart contract. In this tutorial, we will only focus on minting the NFT.

We will start with the smart contract part. Building an NFT minting smart contract is relatively simple, thanks to the standard library provided by OpenZeppelin. We use the ERC721 standard created by them to code the NFT minting smart contract.

For the frontend section, we choose to use the tech stack Next.js and web3.js. Next.js is a framework built on the react.js library, which helps us easily kickstart a website. Web3.js is a node package specifically designed to interact with the smart contract (alternatively, you can choose to use hardhat). There are two main missions of web3.js: to create a provider and to encapsulate the contract object for the frontend to interact with. We created an `index.js` file under the `utils` folder to manage all web3 initializations. 

# How it Works

## Smart contract

- Make sure you have MetaMask installed and logged in on your browser.
- Make sure that your MetaMask wallet is correctly configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.
    - For testnet development
        - Create a file named `.secret`, and save your MetaMask Secret Phrase in this file.
    - For local environement
        - Run the command `ganache`, choose one of the private keys shown in the command line to `.secret` file
- Run the command `truffle compile` to compile the smart contracts.
- Run the command `truffle migrate --reset --network bscTestnet` to deploy the contract on the BSC Testnet. Or Run the command `truffle migrate` for local environment.

## Frontend

- Run the command `cd client` to move to the frontend folder
- Create a `.env` include the following variables
    - If you want to use the local environment
        - `NEXT_PUBLIC_MODE=”development”`
        - `NEXT_PUBLIC_LOCAL_NODE=“ws://localhost:8545”`
    - Add `NEXT_PUBLIC_CONTRACT_ADDRESS=<your contract address>`
- Run the command `npm install` to install all the dependencies
- Run the command `npm run dev` to start the server
- Now you are all set to mint your first NFT on **BSC testnet** or **local environment**

## Running the application

- The default deployment for NextJs is [`http://localhost:3000/`](http://localhost:3000/) Open a browser and go to this URL
- Make sure that your MetaMask wallet is correctly installed and configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.
- Select your desired account of MetaMask that has BNB Test tokens to perform transactions.
- To get test tokens use the [BNB Smart Chain Faucet](https://testnet.binance.org/faucet-smart).
- Click the **Connect Wallet** button to connect the wallet first.
- Click the **Mint** button to mint an NFT
- Confirm the transaction when the MetaMask notification pops up.

# Unit Test of Smart Contracts

- Set up the ganache [localhost](http://localhost) by starting `ganache` in command line
    - If you have not installed the Ganache, please use the following command to install `npm install ganache --global`
- Replace the `mnemonic` with a ganache private key.
- To run the test case, you can use `truffle test`

# Unit Test Coverage

```
NFTCollection
 Initialize NFTCollection
    ✔ should have a name
    ✔ should have a symbol
 Mint NFT
    ✔ should mint a NFT (64ms)
    ✔ should not mint an NFT if insufficient ether is sent (118ms)
    ✔ should not mint an NFT if maximum supply is reached (621ms)

5 passing (865ms)
```

# Contact

For more inquiries and conversations, feel free to contact us at our [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597)

Give feedback
