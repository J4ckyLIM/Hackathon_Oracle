import { Managers } from '../RequestManager/Managers';
import { TickerPrice } from './TickerPrice';

export type TickerPriceWithManager = TickerPrice & { manager: Managers };
