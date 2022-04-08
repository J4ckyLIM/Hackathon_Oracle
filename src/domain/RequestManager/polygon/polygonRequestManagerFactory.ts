import { PolygonRequestManager } from './PolygonRequestManager';

const POLYGON_API_KEY = '1a3a10a961c23618604910eb8299b9a7';

export const polygonRequestManagerFactory = () => {
  return new PolygonRequestManager({
    baseURL: 'https://api.polygon.io/v1',
    apiKey: POLYGON_API_KEY,
  });
};
