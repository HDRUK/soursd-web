import { VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { GetSystemConfigResponse } from "@/services/system_config/types";
import { escapeAndParse } from "./json";

function parseSystemConfig(data: GetSystemConfigResponse | undefined) {
  return data
    ? data.reduce(
        (accumulator, { name, value, ...restProps }) =>
          ({
            ...accumulator,
            [name]: {
              ...restProps,
              value:
                name === VALIDATION_SCHEMA_KEY
                  ? escapeAndParse(value).validationSchema
                  : value,
            },
            /* eslint-disable  @typescript-eslint/no-explicit-any */
          }) as Record<string, any>,
        {}
      )
    : {};
}

export { parseSystemConfig };
