const Keypair = require("stellar-base").Keypair;

const newAccount = Keypair.random();

console.log("New key pair created!");
console.log("  Account ID: " + newAccount.publicKey());
console.log("  Secret: " + newAccount.secret());