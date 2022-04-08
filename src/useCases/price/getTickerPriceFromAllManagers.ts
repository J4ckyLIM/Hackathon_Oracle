import { RequestManager } from '../../domain/RequestManager/RequestManager';
import { TickerPriceWithManager } from '../../domain/Ticker/TickerPriceWithManager';
import { Tickers } from '../../domain/Ticker/Tickers';

export const getTickerPriceFromAllManagers = async ({
  managers,
  ticker,
  date,
}: {
  managers: RequestManager[];
  ticker: Tickers;
  date: string;
}): Promise<TickerPriceWithManager[]> => {
  const prices = await Promise.all(
    managers.map(
      async (manager) =>
        await manager.getDailyOpenClose({
          ticker,
          date,
        }),
    ),
  );

  return prices;
};
