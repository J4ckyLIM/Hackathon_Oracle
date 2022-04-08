import * as winston from 'winston';

import { AppLogger } from './AppLogger';

interface CreateWinstonLoggerOptions {
  prefix?: string;
  level?: string;
}

/**
 * In case the arg is an Error, we pull the 'message' and 'stack' properties. This is because they are non-enumerable properties and as such JSON.stringify won't print them.
 */
const extractArgProperties = (argument: unknown) => (argument instanceof Error
    ? { type: 'Error', message: argument.message, stack: argument.stack }
    : argument;

const getWinstonLogFormat = (opts?: CreateWinstonLoggerOptions) => winston.format.printf((log) => {
    const prefix = opts?.prefix ? `[${opts.prefix}] ` : '';
    const logHeader = `${prefix}${log.timestamp} - ${log.level}: ${log.message}`;
    // https://github.com/winstonjs/winston#creating-child-loggers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const args = log[Symbol.for('splat') as any];

    const additionalArgs = args
      ?.map((additionalArg: unknown, index: number) => JSON.stringify({
          [index]: extractArgProperties(additionalArg),
        }))
      .join(',');

    const stringifiedAdditionalArgs = additionalArgs
      ? `\nargs: ${additionalArgs}`
      : '';

    const stringifiedStack = log.stack ? `\nstack: ${log.stack}` : '';

    return `${logHeader}${stringifiedAdditionalArgs}${stringifiedStack}`;
  });

export const loggerLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const colors = {
  level: true,
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'green',
    trace: 'green',
  },
};

export interface AppLogerLevel extends winston.Logger {
  fatal: winston.LeveledLogMethod;
  error: winston.LeveledLogMethod;
  warn: winston.LeveledLogMethod;
  info: winston.LeveledLogMethod;
  debug: winston.LeveledLogMethod;
  trace: winston.LeveledLogMethod;
}

export const createWinstonLogger = (
  opts?: CreateWinstonLoggerOptions,
): AppLogger => {
  const customFormatter = getWinstonLogFormat(opts);
  winston.addColors(colors.colors);
  const level = opts?.level ?? 'info';
  const logger = <AppLogerLevel>winston.createLogger({
    level,
    levels: loggerLevels,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.colorize(colors),
      customFormatter,
    ),
    transports: new winston.transports.Console(),
  });

  return logger;
};
