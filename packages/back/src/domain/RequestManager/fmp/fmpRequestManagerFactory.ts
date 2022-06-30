import { FMPRequestManager } from './FMPRequestManager';

const FMP_API_KEY = '1a3a10a961c23618604910eb8299b9a7';

export const fmpRequestManagerFactory = () =>
  new FMPRequestManager({
    baseURL: 'https://financialmodelingprep.com/api/v3',
    apiKey: FMP_API_KEY,
  });
