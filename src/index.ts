// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });
import * as fs from 'fs';

import { LocalDate } from '@js-joda/core';
import { ethers } from 'ethers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InfuraProvider } from '@ethersproject/providers';

import * as IPFS from 'ipfs-http-client';
import { Contract } from './abi';
import { Tickers } from './domain/Ticker/Tickers';
import { fmpRequestManagerFactory } from './domain/RequestManager/fmp/fmpRequestManagerFactory';
import { polygonRequestManagerFactory } from './domain/RequestManager/polygon/polygonRequestManagerFactory';
import { RequestManager } from './domain/RequestManager/RequestManager';
import { getTickerPriceFromAllManagers } from './useCases/price/getTickerPriceFromAllManagers';
import { compareAndCertifyTickerPrice } from './useCases/price/compareAndCertifyTickerPrice';

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;

const PROJECT_ID = process.env.PROJECT_ID as string;
const PROJECT_SECRET = process.env.PROJECT_SECRET as string;

const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const provider = new InfuraProvider('ropsten', {
  projectId: PROJECT_ID,
  projectSecret: PROJECT_SECRET,
});

const getBalanceAsync = async (address: string) => {
  const rawBalance = await provider.getBalance(address);
  return ethers.utils.formatEther(rawBalance);
};

const getDayOffset = (day: number) => {
  if(day === 6) { // Saturday
    return 1;
  } else if (day === 0) { // Sunday
    return 2
  } else if (day === 1) { // Monday
    return 3
  } else {
    return 0
  }
}

const main = async () => {
  const managers: RequestManager[] = [
    fmpRequestManagerFactory(),
    polygonRequestManagerFactory(),
  ];

  const todayDay = new Date().getDay();
  const today = LocalDate.now();
  const todayISODate = today.minusDays(1 + getDayOffset(todayDay)).toString();

  const tickerPrices = await getTickerPriceFromAllManagers({
    managers,
    ticker: Tickers.AAPL,
    date: todayISODate,
  });

  const certifiedPrices = await compareAndCertifyTickerPrice({ tickerPrices });

  // Need to convert in String
  const stringifyData = JSON.stringify(certifiedPrices);

  // Create new random account
  const account = {
    address: ACCOUNT_ADDRESS,
    privateKey: PRIVATE_KEY,
  };
  const wallet = new ethers.Wallet(account.privateKey, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract, wallet);

  const currentDate = new Date().toISOString().slice(0, 10);
  const directory = './history/' + currentDate + '.txt';

  // Generate IPFS
  const client = IPFS.create();
  const { cid } = await client.add(stringifyData);

  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();

  const data =
    currentHours +
    ':' +
    currentMinutes +
    ':' +
    currentSeconds +
    ` => https://infura-ipfs.io/ipfs/${cid} \r\n`;
  fs.writeFileSync(directory, data, { flag: 'a+' });

  void (async () => {
    const tx = await contract.setData(
      certifiedPrices.symbol,
      certifiedPrices.high,
      certifiedPrices.low,
      certifiedPrices.open,
      certifiedPrices.close,
      certifiedPrices.date
    );
    const result = await tx.wait();
    // eslint-disable-next-line no-console
    console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);
  })();
};

void main();
