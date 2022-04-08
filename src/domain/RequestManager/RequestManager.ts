import { TickerPrice } from '../Ticker/TickerPrice';
import { Tickers } from '../Ticker/Tickers';

type RequestManagerConstructorArgs = {
  name: string;
  baseURL: string;
  apiKey: string;
};

export abstract class RequestManager {
  name: string;

  baseURL: string;

  apiKey: string;

  constructor(props: RequestManagerConstructorArgs) {
    this.name = props.name;
    this.baseURL = props.baseURL;
    this.apiKey = props.apiKey;
  }

  /**
   * Fetch daily open and close price for a ticker
   * @param ticker Symbol of the ticker
   * @param date ISO Date format: YYYY-MM-DD
   */
  abstract getDailyOpenClose(args: {
    ticker: Tickers;
    date: string;
  }): Promise<TickerPrice>;
}
