import { Tickers } from './domain/Ticker/Tickers';
import { LocalDate } from '@js-joda/core';
import { ethers } from 'ethers';
import { TestContract } from './abi';
import { InfuraProvider } from '@ethersproject/providers';

import * as IPFS from 'ipfs-http-client';
import { fmpRequestManagerFactory } from './domain/RequestManager/fmp/fmpRequestManagerFactory';
import { polygonRequestManagerFactory } from './domain/RequestManager/polygon/polygonRequestManagerFactory';
import { RequestManager } from './domain/RequestManager/RequestManager';
import { getTickerPriceFromAllManagers } from './useCases/price/getTickerPriceFromAllManagers';
import { compareAndCertifyTickerPrice } from './useCases/price/compareAndCertifyTickerPrice';

const TEST_CONTRACT_ADDRESS = '0x89a67490d70452ee7d7be9f775e708ee70058f42';

const PROJECT_ID = 'f2166ad1fd2043a3b5920fa9a47dee0c';
const PROJECT_SECRET = 'a0ef7fece8e24f20b851d44463d68428';

const ACCOUNT_ADDRESS = '0x76a15F9B153765cBD6fc737969b65116D1860Bc1';
const PRIVATE_KEY =
  '0x3e9ae3e87cb7e926f9eaf0d87429d9a17283fd504617975d65f2c88b7bda83f6';

const provider = new InfuraProvider('ropsten', {
  projectId: PROJECT_ID,
  projectSecret: PROJECT_SECRET,
});

const getBalanceAsync = async (address: string) => {
  const rawBalance = await provider.getBalance(address);
  return ethers.utils.formatEther(rawBalance);
};

const main = async () => {
  const managers: RequestManager[] = [
    fmpRequestManagerFactory(),
    polygonRequestManagerFactory(),
  ];

  const todayISODate = LocalDate.now().minusDays(1).toString();

  const tickerPrices = await getTickerPriceFromAllManagers({
    managers,
    ticker: Tickers.AAPL,
    date: todayISODate,
  });

  const certifiedPrices = await compareAndCertifyTickerPrice({ tickerPrices });

  // Need to convert in String
  const stringifyData = JSON.stringify(certifiedPrices);
  console.log(stringifyData);

  // Create new random account
  const account = {
    address: ACCOUNT_ADDRESS,
    privateKey: PRIVATE_KEY,
  };
  const accountBalance = await getBalanceAsync(account.address);
  console.log(accountBalance);

  const wallet = new ethers.Wallet(account.privateKey, provider);
  const contract = new ethers.Contract(
    TEST_CONTRACT_ADDRESS,
    TestContract,
    wallet,
  );

  // Generate IPFS
  const client = await IPFS.create({
    host: 'ipfs.io',
    protocol: 'https',
    apiPath: 'ipfs',
  });
  console.log(client);

  /*const result = await client.files.read('https://ipfs.io/ipfs/QmZqXJgxkP4gAkWid2xNg68bPrrsa7zHqzU3o4F7R8E3Hz')
  console.log(result)*/

  const ipfsAddr = '/ipfs/QmZqXJgxkP4gAkWid2xNg68bPrrsa7zHqzU3o4F7R8E3Hz';
  await client.name.publish(ipfsAddr).then(function (res) {
    console.log(`https://ipfs.io/ipns/${res.name}`);
  });

  /*(async function () {
    const tx = await contract.set("{symbol:AAPL,high:173.63,low:170.13,open:172.36,close:171.83,date:2022-04-06T00:00:00.000Z}");
    const result = await tx.wait();
    console.log(`https://ropsten.etherscan.io/tx/${result.transactionHash}`);
  })();*/
};

main();
