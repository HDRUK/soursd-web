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

export { escapeAndParse, parseValidJSON, convertJwtToJSON };
