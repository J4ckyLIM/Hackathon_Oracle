type ValidatedEnvironmentVariables = {
  key: string;
  value: string;
};

/**
 * @param  {string[]} variablesKeys
 * This method is used to validate env variables or throw if one is missing
 * param represents a key string array you are willing to validate
 * @predicate  {(variableValue: string) => boolean} use to add an additional validation over the env variables
 */

export const validateEnvironmentVariables =
  (...variablesKeys: string[]) =>
  (predicate?: (variableValue: string) => boolean) => {
    const fetchedVariables: ValidatedEnvironmentVariables[] = variablesKeys.map(
      variableKey => {
        const maybeValue = process.env[`${variableKey}`];
        if (maybeValue === undefined) {
          const errorMessage = `Missing ${variableKey} parameter in your env. Please export the env variable and restart the app.`;
          throw new Error(errorMessage);
        } else if (predicate !== undefined && !predicate?.(maybeValue)) {
          const errorMessage = `The env variable ${variableKey} does not match with the predicate validator.`;
          throw new Error(errorMessage);
        }
        return { value: maybeValue, key: variableKey };
      },
    );

    return fetchedVariables;
  };
