# Hackathon_Oracle

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


Our problem is to answer a customer's need by building a POC around blockchain


## Table of Contents
- [tech](#tech)
- [Explanation](#explanation)
- [How to interact](#interact)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Tech

For our project we are using dif technology:
  - IPFS(InterPlanetary Files System)
  - IPNS (InterPlanetary Name System)
  - TheGraph(GRT)
  - GraphQl
  - TypeScript & Node
  - Solidity


## IPFS (InterPlanetary File System)

IPFS is a distributed system for storing and accessing files, websites, applications, and data.
Also, the InterPlanetary File System (IPFS) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

<img src="https://www.researchgate.net/profile/Magnus_Westerlund2/publication/333018189/figure/fig1/AS:757344308822016@1557576362037/IPFS-addressing-process-flow.png">

## IPNS (InterPlanetary Name System)

InterPlanetary Name System is an IPFS address dynamic, so it's creating an address that can be updated.
A name in IPNS is the hash of a public key. It is associated with a record containing information about the hash it links to that is signed by the corresponding private key. New records can be signed and published at any time.


## Explanation

Our first thought was to think about how to make the data onchain/offchain easily. For this we thought of this response scheme:
- Possibility to add a "human api" like the company.

 <img src="https://media.discordapp.net/attachments/960837766768377896/962045205962440734/unknown.png?width=1416&height=1034">

The different steps are:
1. Get the data coming from 2 differents standard APIs (Polygon "https://polygon.io/" & Financial Modeling Prep "https://site.financialmodelingprep.com/").
   Compare the Data and get :
 
 ```sh
 {
  "afterHours": 322.1,
  "close": 325.12,
  "from": "2020-10-14T00:00:00.000Z",
  "high": 326.2,
  "low": 322.3,
  "open": 324.66,
  "preMarket": 324.5,
  "status": "OK",
  "symbol": "AAPL",
  "volume": 26122646
 }.
 ```
 
2. Data processing to validate data veracity.
3. Create & push data to IPFS node (get json file). -> From this step the data are stored On-chain.
4. Create new CID from IPFS data and update the IPNS Gateway (Dynamic url using CID).
5. Set IPNS hash to our oracle contract.
6. Storage of the IPNS gateway on a decentralized oracle (smart contract).
7. Certify data through CAST framework. (In progress).

## In progress

- Adding our CIDs to a history file. Add our CIDs in a history file to keep track of all the API requests made during the day.
- UI Explorer to search for a specific daily candle.

## Install

This project uses [node](http://nodejs.org).

```sh
$ yarn install
```

## Usage

```sh
$ yarn start-dev
```

## Execution

Once the project is launched, it will first fetch the data via an API, check that the data is not erroneous. Once validated, this data is stored in a decentralized cloud which is directly linked to a smart contract.

### Contributors

This project exists thanks to Jacky LIM, Teddy JEAN-FRANCOIS, Ilyane DELOR & Hugo BOUTOT.  
<a href="https://github.com/J4ckyLIM/Hackathon_Oracle/graphs/contributors">


## License

[MIT](LICENSE) © ESGI 4IBC
