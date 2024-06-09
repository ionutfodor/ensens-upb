import { plainToClass } from "class-transformer";
import { EnvironmentVariables } from "../model/configuration-properties";
import { validateSync } from "class-validator";

export function validateConfig(configuration: Record<string, unknown>): EnvironmentVariables {
  const finalConfig = plainToClass(EnvironmentVariables, configuration,
    { enableImplicitConversion: true });
  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  let index = 0;
  for (const error of errors) {
    Object.values(error.constraints).map((err) => {
      ++index;
      console.log(index, err);
    });
  }

  if (errors.length > 0) {
    throw new Error('Environment Variables are not properly set!');
  }

  return finalConfig;
}

