# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

## Dependencies
This project used the following:

* Truffle v5.4.5
* Solidity v0.5.16
* Ganche 6.12.2
* zocrates docker image (latest)
* MyEtherWallet V5 (older than current version)

## Project Description
The objective of this project was to create an ERC721 compatible token contract and use it to create some NFT's representing real estate titles. Zocrates and zk-SNARKS are used to provide proof of ownership so that tokens can be minted. The contract is deployed on the Rinkeby test network and the Opensea marketplace has a storefront through which the NFT's from the contract can be sold. I generated 10 NFT's, put 5 of them up for sale, and purchased them from another account to demonstrate the process.

The Opensea storefront is located here: [https://testnets.opensea.io/collection/unidentified-contract-izslpeffes](https://testnets.opensea.io/collection/unidentified-contract-izslpeffes)]

The deployed contracts on the Rinkeby network have the following hashes and addresses:

SolnSquareVerifier:

* Contract Address: 0x3735BafeCDBA461e1452333E7ec5ce9b672F3b06
* Transaction Hash: 0xd1bde8bd4807377b4bf1a00591d27c6ce43949810d08100bf15792c6ac95e397

Verifier:

* Contract Address: 0x442869de673753A3209f65151f989aAAbE509793
* Transaction Hash: 0x3f41d98ff56dbd20a59c17818a22292fdc241dbf687cb458930137fb6184977f

Contract ABI's can be found inside the JSON files SolnSquareVerifier.json and Verifier.json in eth-contracts/build/contracts.

## Installation

Clone this repository:

```git clone https://github.com/westofpluto/capstone-real-estate-nft.git```

Then CD into MyBlockchain-Capstone and run npm install to install all dependencies.

You will need some "secret" files for wallet pneumonics and infura keys, all of which must be placed in the eth-contracts folder under the main project folder. The files are as follows:

* File ".secret" contains the mnemonic used by ganache
* File ".rineby_secret" uses the mnemonic used to deploy and interact with the Rinkeby network. It must be the mnemonic that was generated for the Metamask wallet you are using.
* File ".infuraKey" is the project key for your Infura project

During testing, run ganache in a separate window using:

```cd eth-contracts```

```./runganache.sh```

With ganache running, you can compile, migrate and run tests:

```truffle compile```

```truffle migrate --reset```

```truffle test```

All tests should pass.

I migrated the contracts to Rinkeby using 

```truffle migrate --reset --network rinkeby```

Once the contracts were deployed to Rinkeby I had to mint 10 tokens. There are old instructions on Youtube here: [https://www.youtube.com/watch?v=8MChn-NJJB0&t=108s](https://www.youtube.com/watch?v=8MChn-NJJB0&t=108s)
Sadly, this doesn't work out of the box - it throws errors if you use the current version of MyEtherWallet. Fortunately, you can make it work fine just by using an older version of MyEtherWallet here: [https://v5.myetherwallet.com/](https://v5.myetherwallet.com/)

You can visit my Opensea storefron here:
[https://testnets.opensea.io/collection/unidentified-contract-izslpeffes](https://testnets.opensea.io/collection/unidentified-contract-izslpeffes)

There you will see I have create and sold 5 tokens representing some imaginary real estate. (Ok it might be real, but I never owned it).

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
