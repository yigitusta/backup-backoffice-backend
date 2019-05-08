const axios = require("axios");
const { backOfficePublic } = require("../config");
const StellarSdk = require("stellar-sdk");
const Keypair = require("stellar-base").Keypair;
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

(async () => {
  while (true) {
    try {
      const sourceKeyPair = Keypair.random();
      const accountSaveResult = await axios.get(`https://friendbot.stellar.org/?addr=${sourceKeyPair.publicKey()}`);
      const account = await server.loadAccount(sourceKeyPair.publicKey());
      const fee = await server.fetchBaseFee();
      const transaction = new StellarSdk.TransactionBuilder(account, { fee })
        .addOperation(StellarSdk.Operation.payment({
          destination: backOfficePublic,
          asset: StellarSdk.Asset.native(),
          amount: '8000',
        }))
        .setTimeout(30)
        .build();
      transaction.sign(sourceKeyPair);
      await server.submitTransaction(transaction);
      console.log("Sent 8000 to backoffice.")
    } catch(e) {
      console.log("error");
      continue;
    }
  }
})();
