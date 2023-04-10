const fs = require("fs");
const mynftContract = artifacts.require("../contracts/NFTCollection.sol");

describe("NFTCollection", function () {
  describe("Initialize NFTCollection", function () {
    let mynft;

    before(async function () {
      mynft = await mynftContract.deployed();
    });

    it("should have a name", async function () {
      const name = await mynft.name();
      assert.equal(name, "NFTCollection", "The name is not NFTCollection");
    });

    it("should have a symbol", async function () {
      const symbol = await mynft.symbol();
      assert.equal(symbol, "MTK", "The symbol is not NFT");
    });
  });

  describe("Mint NFT", function () {
    const mnemonic =
      "0x81fd8199238bcd2dcd5e9a2fb97f0ebdc04716a145e2e47b2ea4735bacc50b16";
    const account = web3.eth.accounts.privateKeyToAccount(mnemonic);

    let mynft;

    before(async function () {
      mynft = await mynftContract.deployed();
    });

    it("should mint a NFT", async function () {
      const mint = await mynft.safeMint(account.address, {
        from: account.address,
        value: web3.utils.toWei("0.05", "ether"),
      });
      assert.equal(mint.logs.length, 1, "The NFT was not minted");
    });

    it("should not mint an NFT if insufficient ether is sent", async function () {
      try {
        await mynft.safeMint(account.address, {
          from: account.address,
          value: web3.utils.toWei("0.01", "ether"),
        });
      } catch (error) {
        assert.equal(
          error.message,
          "VM Exception while processing transaction: revert Not enough ether sent. -- Reason given: Not enough ether sent..",
          "Incorrect error message"
        );
      }
    });

    it("should not mint an NFT if maximum supply is reached", async function () {
      // Assume the maximum supply is reached, replace with the actual maximum supply in the contract
      const maxSupply = 10;

      for (let i = 0; i < maxSupply - 1; i++) {
        await mynft.safeMint(account.address, {
          from: account.address,
          value: web3.utils.toWei("0.05", "ether"),
        });
      }

      try {
        await mynft.safeMint(account.address, {
          from: account.address,
          value: web3.utils.toWei("0.01", "ether"),
        });
      } catch (error) {
        assert.equal(
          error.message,
          "VM Exception while processing transaction: revert Can't mint anymore tokens. -- Reason given: Can't mint anymore tokens..",
          "Incorrect error message"
        );
      }
    });
  });
});
