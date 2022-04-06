import { Tickers } from "./Tickers";

export type TickerPrice = {
  symbol: Tickers;
  high: number;
  low: number;
  open: number;
  close: number;
  date: Date;
}