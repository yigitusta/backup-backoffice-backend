const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

StellarSdk.Network.useTestNetwork();

(async () => {
  const publicKey = "GCYEAR7N7JZ5W72TRRTFILLF5QSBDLEEQDOJ4HBQD2RITACLW772N5PC";
  try {
    const account = await server.loadAccount(publicKey);
    const balance = account.balances[0].balance;
    console.log(balance);
  } catch(e) {
    console.log(e);
  }
})();