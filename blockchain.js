const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

StellarSdk.Network.useTestNetwork();

module.exports = {
  async getBalance(publicKey) {
    console.log(publicKey);
    try {
      const account = await server.loadAccount(publicKey);
      const balance = account.balances[0].balance;
      return balance;
    } catch(e) {
      console.log(e);
    }
  }
};