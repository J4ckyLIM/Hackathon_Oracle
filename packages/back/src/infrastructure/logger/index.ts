// import { validateEnvironmentVariables } from '../../utils/validateEnvironnementVariables';
import { AppLogger } from './AppLogger';
import { createWinstonLogger } from './winstonLogger';

// const [logLevel] = validateEnvironmentVariables('LOGGER_LEVEL')(
//   variableValue =>
//     variableValue === 'fatal' ||
//     variableValue === 'error' ||
//     variableValue === 'warn' ||
//     variableValue === 'info' ||
//     variableValue === 'debug' ||
//     variableValue === 'trace',
// );

// export const logger: AppLogger = createWinstonLogger({ level: logLevel.value });
export const logger: AppLogger = createWinstonLogger({ level: 'trace' });
