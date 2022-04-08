import { first } from 'lodash';
import { logger } from '../../../infrastructure/logger';
import { createAxiosInstance } from '../../../utils/createAxiosInstance';
import { TickerPriceWithManager } from '../../Ticker/TickerPriceWithManager';
import { Tickers } from '../../Ticker/Tickers';
import { Managers } from '../Managers';
import { RequestManager } from '../RequestManager';

const axios = createAxiosInstance({ name: 'FMP' });

export type FMPRequestManagerConstructorArgs = {
  baseURL: string;
  apiKey: string;
};

export class FMPRequestManager extends RequestManager {
  constructor(props: FMPRequestManagerConstructorArgs) {
    super({ name: 'FMP', baseURL: props.baseURL, apiKey: props.apiKey });
  }

  async getDailyOpenClose(args: {
    ticker: Tickers;
    date: string;
  }): Promise<TickerPriceWithManager> {
    logger.info(`[${this.name}]: getDailyOpenClose for ticker: ${args.ticker}`);

    const url = `${this.baseURL}/historical-price-full/${args.ticker}?from=${args.date}&to=${args.date}&apikey=${this.apiKey}`;
    const result = await axios.get(url);
    const { historical } = result.data;
    const data: any = first(historical);

    return {
      symbol: args.ticker,
      high: data.high,
      low: data.low,
      open: data.open,
      close: data.close,
      date: new Date(args.date),
      manager: Managers.FMP,
    };
  }
}
