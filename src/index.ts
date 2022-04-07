import { PolygonRequestManager } from "./domain/RequestManager/PolygonRequestManager";
import { Tickers } from "./domain/Ticker/Tickers";
import { getTickerPrice } from "./useCases/price/getTickerPrice";
import { LocalDate } from '@js-joda/core';
import { logger } from './infrastructure/logger';
import { Contract, ethers } from 'ethers';
import { TestContract } from "./abi";
import { InfuraProvider } from "@ethersproject/providers";

const INFURA_URL = 'https://ropsten.infura.io/v3/f2166ad1fd2043a3b5920fa9a47dee0c';
const POLYGON_API_KEY = 'x3B2H9yFehXvytQcJwjY0gpBviqZhrvO';
const TEST_CONTRACT_ADDRESS = '0x89a67490d70452ee7d7be9f775e708ee70058f42';
const SIGNER_ADDRESS = '0x4B6556041996EC220Da3EC3089aE3Ea5209BeA56';

const main = async () => {
  // const apiKey = process.env.POLYGON_API_KEY;
  if(!POLYGON_API_KEY) {
    logger.info('No API KEY');
  } else {
    const polygonRequestManager = new PolygonRequestManager({ baseURL: 'https://api.polygon.io/v1', apiKey: POLYGON_API_KEY });
    const todayISODate = LocalDate.now().minusDays(1).toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await getTickerPrice({ requestManager: polygonRequestManager, ticker: Tickers.AAPL, date: todayISODate });
    // console.log(result);
    const provider = new InfuraProvider("ropsten", {
      projectId: 'f2166ad1fd2043a3b5920fa9a47dee0c',
      projectSecret: 'a0ef7fece8e24f20b851d44463d68428'
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const signer = provider.getSigner();
    const testContract = new ethers.Contract(TEST_CONTRACT_ADDRESS, TestContract, signer);
    const tx = await testContract.set(666);
    const signedTx = await signer.signTransaction(tx);
    console.log(signedTx);
    // const getResult = await testContract.get().call();
    // console.log(getResult);
  }
}

main();