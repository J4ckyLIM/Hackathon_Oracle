import { createAxiosInstance } from "../../utils/createAxiosInstance";
import { TickerPrice } from "../Ticker/TickerPrice";
import { Tickers } from "../Ticker/Tickers";
import { RequestManager } from "./RequestManager";

const axios = createAxiosInstance({ name: 'Polygon' });

export type PolygonRequestManagerConstructorArgs = {
  baseURL: string;
  apiKey: string;
}
export class PolygonRequestManager extends RequestManager {

  constructor(props: PolygonRequestManagerConstructorArgs) {
    super({ name: 'Polygon' , baseURL: props.baseURL, apiKey: props.apiKey});
  }

  
  async getDailyOpenClose(args: { ticker: Tickers; date: string; }): Promise<TickerPrice> {
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
    }
  }
}