import { omit } from 'lodash';
import { TickerPrice } from '../../domain/Ticker/TickerPrice';
import { TickerPriceWithManager } from '../../domain/Ticker/TickerPriceWithManager';

// TODO: implement comparison of ticker price
export const compareAndCertifyTickerPrice = async ({
  tickerPrices,
}: {
  tickerPrices: TickerPriceWithManager[];
}): Promise<TickerPrice> => {
  const validatedData = tickerPrices[0];

  return omit(validatedData, ['manager']); // TickerPrice type
};
