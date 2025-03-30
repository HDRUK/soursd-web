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

function compareEquals<T extends {}, P extends {}>(a: T, b: P) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();

  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
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
