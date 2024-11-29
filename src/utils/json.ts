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

export { escapeAndParse, parseValidJSON };
