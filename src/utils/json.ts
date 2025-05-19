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
  return keys.reduce(
    (acc, value) => ({
      ...acc,
      [value]: data[value as Extract<keyof T, string>],
    }),
    {}
  ) as Partial<T>;
}

function omit<T>(data: T, keys: string[]) {
  if (!data) return data;

  return pick(
    data,
    Object.keys(data).filter(key => !keys.includes(key))
  ) as Partial<T>;
}

export { escapeAndParse, parseValidJSON, convertJwtToJSON, pick, omit };
