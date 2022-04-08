import { PolygonRequestManager } from './PolygonRequestManager';

const POLYGON_API_KEY = 'x3B2H9yFehXvytQcJwjY0gpBviqZhrvO';

export const polygonRequestManagerFactory = () => {
  return new PolygonRequestManager({
    baseURL: 'https://api.polygon.io/v1',
    apiKey: POLYGON_API_KEY,
  });
};
