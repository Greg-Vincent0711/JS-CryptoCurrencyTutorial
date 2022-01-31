const EC = require('elliptic').ec;
//Curve used to create crypto wallets
const ec = new EC('secp256k1');
//create a key pair
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');
console.log();
console.log('Public key: ' , publicKey);

console.log();
console.log('Private key: ' , privateKey); 