import { PolygonRequestManager } from './domain/RequestManager/PolygonRequestManager';
import { Tickers } from './domain/Ticker/Tickers';
import { getTickerPrice } from './useCases/price/getTickerPrice';
import { LocalDate } from '@js-joda/core';
import { logger } from './infrastructure/logger';
import { ethers } from 'ethers';
import { Contract } from './abi';
import { InfuraProvider } from '@ethersproject/providers';

import * as IPFS from "ipfs-http-client";

const POLYGON_API_KEY = 'x3B2H9yFehXvytQcJwjY0gpBviqZhrvO';
const CONTRACT_ADDRESS = '0xeAfc7d1a89719c3BA25fbC3709587f9F985DAf7B';

const PROJECT_ID = 'f2166ad1fd2043a3b5920fa9a47dee0c';
const PROJECT_SECRET = 'a0ef7fece8e24f20b851d44463d68428';

const ACCOUNT_ADDRESS = '0x76a15F9B153765cBD6fc737969b65116D1860Bc1';
const PRIVATE_KEY = '0x3e9ae3e87cb7e926f9eaf0d87429d9a17283fd504617975d65f2c88b7bda83f6';

const provider = new InfuraProvider('ropsten', {
  projectId: PROJECT_ID,
  projectSecret: PROJECT_SECRET,
});

const getBalanceAsync = async (address: string) => {
  const rawBalance = await provider.getBalance(address);
  return ethers.utils.formatEther(rawBalance);
};

const main = async () => {
  if (!POLYGON_API_KEY) {
    logger.info('No API KEY');
  } else {
    const polygonRequestManager = new PolygonRequestManager({
      baseURL: 'https://api.polygon.io/v1',
      apiKey: POLYGON_API_KEY,
    });
    const todayISODate = LocalDate.now().minusDays(1).toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await getTickerPrice({
      requestManager: polygonRequestManager,
      ticker: Tickers.AAPL,
      date: todayISODate,
    });
    // Need to convert in String
    const stringifyData = JSON.stringify(data);

    // Create new random account
    const account = {
      address: ACCOUNT_ADDRESS,
      privateKey: PRIVATE_KEY,
    };
    const accountBalance = await getBalanceAsync(account.address);
    const wallet = new ethers.Wallet(account.privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract, wallet);

    // Generate IPFS
    const client = await IPFS.create();
    const { cid } = await client.add(stringifyData);
    console.log(stringifyData)
    
    client.name.publish(`/ipfs/${ cid.toString() }`).then(function (res) {
      console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
    });

    (async function () {
      const tx = await contract.set(stringifyData);
      const result = await tx.wait();
      console.log(`https://ropsten.etherscan.io/tx/${result.transactionHash}`);
    })();
  }
};

main();
