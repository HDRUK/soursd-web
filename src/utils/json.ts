function escapeAndParse(value: string) {
  return JSON.parse(value.replaceAll("\\", "\\\\"));
}

function parseValidJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch (_e) {
    return value;
  }
}

function convertJwtToJSON(token: string) {
  return parseValidJSON(Buffer.from(token.split(".")[1], "base64").toString());
}

function pick<T>(data: T, keys: string[]) {
  return Object.assign(
    {},
    ...keys.map(key => ({ [key]: data[key as Extract<keyof T, string>] }))
  );
}

export { escapeAndParse, parseValidJSON, convertJwtToJSON, pick };
