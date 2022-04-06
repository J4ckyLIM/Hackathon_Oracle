/* eslint-disable @typescript-eslint/no-explicit-any */

/*
This logger interface is implemented by https://datatracker.ietf.org/doc/html/rfc5424
*/
export interface AppLogger {
  trace(...args: any[]): void;
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  fatal(...args: any[]): void;
}