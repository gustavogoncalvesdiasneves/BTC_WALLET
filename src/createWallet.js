// importing dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// bitcoin - main-net
// testnet - test-net

// define network - testnet
const network = bitcoin.networks.testnet;

// derivation wallet - HD
// const path = `m/49'/0/0'/0` // mainnet
const path = `m/49'/1/0'/0` // testnet

async function createWallet() 
{
    // creating mnemonic for seed (words of password)
    let mnemonic = bip39.generateMnemonic();
    const seed = await bip39.mnemonicToSeed(mnemonic); // await is needed
    
    // creating root of wallet - HD
    let root = bip32.fromSeed(seed,network);
    
    // creating account
    let account = root.derivePath(path);
    let node = account.derive(0).derive(0);
    
    let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network
    }).address
    
    console.log("Wallet generated")
    console.log("Address: ", btcAddress)
    console.log("Private Key: ", node.toWIF())
    console.log("Seeds: ", mnemonic)
}

createWallet().catch(console.error)