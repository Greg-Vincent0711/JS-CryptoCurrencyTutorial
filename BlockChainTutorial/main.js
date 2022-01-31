const{BlockChain, Transaction} = require('./BlockChain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('3a2418ccecd708647ab5c2d238322ab23c350e01552115e0ba628653263694dc');
//Wallet address is your hashed public key
const myWalletAddr = myKey.getPublic('hex');
let Vincentium = new BlockChain();

//Create new transactions
const tx1 = new Transaction(myWalletAddr, 'publicKey', 11);
const tx2 = new Transaction(myWalletAddr, 'publicKey', 50);

//Sign transaction
tx1.signTransaction(myKey);
tx2.signTransaction(myKey);

//Add it to a block on the chain
Vincentium.addTransaction(tx1);
Vincentium.addTransaction(tx2);

console.log('\nStarting the mining operation...');
Vincentium.minePendingTransactions(myWalletAddr);
Vincentium.minePendingTransactions(myWalletAddr);
console.log("Greg's balance is ", Vincentium.getAddressBalance(myWalletAddr));





