import { logger } from '../../../infrastructure/logger';
import { createAxiosInstance } from '../../../utils/createAxiosInstance';
import { TickerPriceWithManager } from '../../Ticker/TickerPriceWithManager';
import { Tickers } from '../../Ticker/Tickers';
import { Managers } from '../Managers';
import { RequestManager } from '../RequestManager';

const axios = createAxiosInstance({ name: 'Polygon' });

export type PolygonRequestManagerConstructorArgs = {
  baseURL: string;
  apiKey: string;
};
export class PolygonRequestManager extends RequestManager {
  constructor(props: PolygonRequestManagerConstructorArgs) {
    super({ name: 'Polygon', baseURL: props.baseURL, apiKey: props.apiKey });
  }

  async getDailyOpenClose(args: {
    ticker: Tickers;
    date: string;
  }): Promise<TickerPriceWithManager> {
    logger.info(`[${this.name}]: getDailyOpenClose for ticker: ${args.ticker}`);

    const url = `${this.baseURL}/open-close/${args.ticker}/${args.date}?adjusted=true&apiKey=${this.apiKey}`;
    const result = await axios.get(url);
    const { data } = result;

    return {
      symbol: args.ticker,
      high: data.high,
      low: data.low,
      open: data.open,
      close: data.close,
      date: new Date(args.date),
      manager: Managers.Polygon,
    };
  }
}
