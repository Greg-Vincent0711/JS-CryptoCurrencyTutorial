/**
 * Following an online tutorial to 
 * learn how the blockchain works
 * in JavaScript to get a better understanding of the tech and vanilla JS
 */
const EC = require('elliptic').ec;
//Curve used to calculate public keys
const ec = new EC('secp256k1');
//Creates hash ID for each block in the chain
const SHA256 = require('crypto-js/sha256');


 class Transaction{
     constructor(fromAddress, toAddress, amount){
         this.fromAddress = fromAddress;
         this.toAddress = toAddress;
         this.amount = amount;
     }
    
     calculateHash(){
        return SHA256(this.fromAddress + this.toAddress
            + this.amount).toString();
     }

     signTransaction(signingKey){
         /**
          * if public key of signingKey pair is not equal to the wallet address
          * something isn't matching up, and the fromAddress is someone else's wallet
          */
         if(signingKey.getPublic('hex') !== this.fromAddress){
             throw new Error('No transactions can be signed from other wallets')
        }
        //create the unique hash for the transaction
        const hashTx = this.calculateHash(); 
        //creating a digital signature
        const sig = signingKey.sign(hashTx, 'bas64');
        this.signature = sig.toDER('hex');
    }

     isValid(){
        // for this to be the case, a miner is being issued a reward
        if(this.fromAddress === null) 
            return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
 }
 
 class Block{
     /**
      * @param {*} timestamp - when the block was created
      * @param {*} transcations - main data passed into the block
      * @param {*} previousHash - link to previous block
      */
     constructor(timestamp, transcations, previousHash = ""){
         this.timestamp = timestamp;
         this.transcations = transcations;
         this.previousHash = previousHash;
         this.hash = this.calculateHash();
         //number only used once to increase mining difficulty per attempted mine
         this.nonce = 0;
     }
 
     calculateHash(){
         //SHA256 is the algorithm used to create the individual hash for each
         return SHA256(this.timestamp + this.previousHash
                       + this.nonce + JSON.stringify(this.transcations)).toString();
     }
 
     mineBlock(difficulty){
         //takes the first amount of the hash from 0 up to the set difficulty
         while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
             //Nonce value changes block hash to allow for a search of a usable hash.
             this.nonce++;
             this.hash = this.calculateHash();
         }
         console.log("Block mined:" + this.hash);
    }
    hasValidTransactions(){
        //No transactions can be invalid
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
    }

 }
 
 //Each new chain of blocks has these properties
 class BlockChain{
     constructor(){
         this.chain = [this.createGenesisBlock()];
         this.difficulty = 3; //nonce number used for mining difficulty
         this.pendingTranscations = []; //Transactions not yet added to a block in the chain
         this.reward = 100; //coins recieved for mining a new block on the chain
     }
     //first block on the chain
     createGenesisBlock(){
         //first block has these properties
         return new Block('1/17/2022', 'Im the first of many.', 0);
     }

     //Latest block accessor function
     getLatestBlock(){
         return this.chain[this.chain.length - 1];
     }


     minePendingTransactions(rewardAddress){
         //create a new block with a current timestamp and data to be passed in
         let block = new Block(Date.now(), this.pendingTranscations);
         block.mineBlock(this.difficulty);
         console.log('Block successfully mined');
         this.chain.push(block);
         //once a block is successfully mined, add a reward transaction to be sent to miner
         this.pendingTranscations = [
             new Transaction(null, rewardAddress, this.reward)
         ];
     }
    
     addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include a fromAddress and toAddress');
        }
        if(!transaction.isValid()){
            throw new Error('Transaction must be valid');
        } 
        this.pendingTranscations.push(transaction);
     }
        
     getAddressBalance(address){
         let balance = 0;
         //for each block in the chain
         for(const block of this.chain){
             //for each transcation in each block
             for(const trans of block.transcations){
                 if(trans.fromAddress === address){
                     balance -= trans.amount;
                 }
                 if(trans.toAddress === address){
                     balance += trans.amount;
                 } 
             }
         }
         return balance;
     }
 
    integrityCheck(){
         //don't check integrity of genesis block. Cannot be changed
         for(let i = 1; i < this.chain.length; i++){
             const currentBlock = this.chain[i];
             const previousBlock = this.chain[i-1];

             if(!currentBlock.hasValidTransactions()){
                 return false
             }
             //Established hash and mathematical hash should be equivalent
             if(currentBlock.hash != currentBlock.calculateHash()){
                 console.log('Conflicting hashes');
                 return false;
             }
             //Current's previous should equal previous's hash
             if(currentBlock.previousHash !== previousBlock.hash){
                 console.log('Conflicting hashes between blocks.');
                 return false;
             }
         }
         console.log('Valid chain.')
         return true;
     }
 }

 module.exports.BlockChain = BlockChain;
 module.exports.Transaction = Transaction;
