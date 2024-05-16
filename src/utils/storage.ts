function getItemAsJson(key: string) {
  const value = localStorage.getItem(key);

  return value && JSON.parse(value);
}

function setItemFromJson<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { getItemAsJson, setItemFromJson };
