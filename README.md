# Hackathon_Oracle

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


Our problem is to answer a customer's need by building a POC around blockchain


## Table of Contents

- [Explanation](#explanation)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Explanation

Our first thought was to think about how to make the data onchain/offchain easily. For this we thought of this response scheme:

 <img src="https://media.discordapp.net/attachments/960837766768377896/962045205962440734/unknown.png?width=1416&height=1034">
 
The different steps are:
1. Get the data coming from different standard APIs.
 (ex: {
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
 }).
 
2. Data processing.
3. Data storage on a decentralized cloud here IPFS.
4. Storage of the IPNS gateway on a decentralized oracle (smart contract)

## Install

This project uses [node](http://nodejs.org).

```sh
$ yarn install
```

## Usage

```sh
$ yarn start
```

## Execution

Once the project is launched, it will first fetch the data via an API, check that the data is not erroneous. Once validated, this data is stored in a decentralized cloud which is directly linked to a smart contract.

### Contributors

This project exists thanks to Jacky LIM, Teddy JEAN-FRANCOIS, Ilyane DELOR & Hugo BOUTOT.  
<a href="https://github.com/J4ckyLIM/Hackathon_Oracle/graphs/contributors">


## License

[MIT](LICENSE) © ESGI 4IBC
