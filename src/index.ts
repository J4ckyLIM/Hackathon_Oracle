import { PolygonRequestManager } from "./domain/RequestManager/PolygonRequestManager";
import { Tickers } from "./domain/Ticker/Tickers";
import { getTickerPrice } from "./useCases/price/getTickerPrice";
import { LocalDate } from '@js-joda/core';

const main = async () => {
  const apiKey = "x3B2H9yFehXvytQcJwjY0gpBviqZhrvO";  // process.env.POLYGON_API_KEY;
  if(!apiKey) {
    console.log('No APIKEY');
  } else {
    const polygonRequestManager = new PolygonRequestManager({ baseURL: 'https://api.polygon.io/v1', apiKey });
    const todayISODate = LocalDate.now().minusDays(1).toString();
    const result = await getTickerPrice({ requestManager: polygonRequestManager, ticker: Tickers.AAPL, date: todayISODate });
    console.log(result);
  }
}

main().then(r => {
  console.log(r)
});