/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import { merge } from 'lodash';

import { logger } from '../infrastructure/logger';

export type AxiosResolver = (data: any) => any;

interface CreateAxiosInstanceConfig {
  name: string;
  responseResolver?: AxiosResolver;
  retryConfig?: IAxiosRetryConfig;
  requestConfig?: AxiosRequestConfig;
}

/**
 * Default number of request retries
 */
const defaultRetriesNum = 2;

const defaultAxiosRequestConfig: AxiosRequestConfig = {
  timeout: 10000,
};

/**
 * Default response resolver function
 * @param response
 */
const defaultResolver = (response: any) => {
  return response;
};

const defaultRetryConfig: IAxiosRetryConfig = {
  shouldResetTimeout: true,
  retries: defaultRetriesNum,
  retryCondition: (error: any) => {
    return (
      !error.response ||
      error.response.status < 200 ||
      error.response.status >= 300
    );
  },
  retryDelay: axiosRetry.exponentialDelay,
};

/**
 * Creates a named Axios interceptor with retry logic
 * @param {AxiosResolver} responseResolver - Executes some code and transforms the response before returning the result
 * @param {AxiosRequestConfig} requestConfig - The default request configuration to set for this Axios isntance
 * @param {string} name - The name of the API for which we're creating an Axios instance. This name will appear in logs
 * @param {IAxiosRetryConfig} retryConfig - See module {@link https://github.com/softonic/axios-retry axios-retry}
 */
export const createAxiosInstance = ({
  name,
  responseResolver = defaultResolver,
  requestConfig = {},
  retryConfig = {},
}: CreateAxiosInstanceConfig) => {
  const axiosInstance = axios.create();

  // set axios-retry configuration
  const usedRetryConfig = { ...defaultRetryConfig, ...retryConfig };
  axiosRetry(axiosInstance, usedRetryConfig);

  // set default request configuration, add specific request config
  axiosInstance.interceptors.request.use((currentRequestConfig) => {
    return merge(
      {},
      defaultAxiosRequestConfig,
      requestConfig,
      currentRequestConfig,
    );
  });

  // handle retries and response error logging
  axiosInstance.interceptors.response.use(responseResolver, async (error) => {
    if (!error.config.greenlyInterceptor) {
      // eslint-disable-next-line no-param-reassign
      error.config.greenlyInterceptor = {
        attemptNumber: 0,
        duration: 0,
      };
    }

    // eslint-disable-next-line no-param-reassign
    error.config.greenlyInterceptor.attemptNumber += 1;
    // log the total duration of all requests and delays
    // eslint-disable-next-line no-param-reassign
    error.config.greenlyInterceptor.duration +=
      Date.now() - error.config['axios-retry'].lastRequestTime;

    const retries = usedRetryConfig.retries || 0;

    //  only log the last attempt
    if (error.config.greenlyInterceptor.attemptNumber === retries + 1) {
      let message = `${error.config.greenlyInterceptor.attemptNumber} attempts, ${error.config.greenlyInterceptor.duration}ms, `;

      if (error.response) {
        message += `${
          error.response.status
        } ${error.response.config.method.toUpperCase()} ${
          error.response.config.url
        }`;
      } else {
        message = 'No response received';
      }

      logger.error(`${name} Error: ${message}\n`, error);
    }
    return Promise.reject(error);
  });

  return axiosInstance;
};
