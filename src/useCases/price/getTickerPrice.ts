import { RequestManager } from '../../domain/RequestManager/RequestManager';
import { Tickers } from '../../domain/Ticker/Tickers';

export const getTickerPrice = async ({
  requestManager,
  ticker,
  date,
}: {
  requestManager: RequestManager;
  ticker: Tickers;
  date: string;
}) => {
  const result = await requestManager.getDailyOpenClose({ ticker, date });
  return result;
};
