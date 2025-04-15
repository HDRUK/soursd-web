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

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function injectParamsIntoPath(
  path: string,
  params: Record<string, string | number>
) {
  let replacedPath = path;

  Object.keys(params).forEach(name => {
    replacedPath = replacedPath.replace(`{${name}}`, params[name]?.toString());
  });

  return replacedPath;
}

function getInitials(name: string) {
  const nameParts = name.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 1);
  }

  return nameParts
    .map(value => value.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export { parseSystemConfig, isProduction, injectParamsIntoPath, getInitials };
