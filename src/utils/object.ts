function isEmpty<T extends object>(object: T) {
  return !Object.keys(object).length;
}

export { isEmpty };
