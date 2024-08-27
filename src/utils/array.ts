function convertStringsToNumbers(values: string[]) {
  return values.map(value => +value);
}

function filterFalsy<T>(values: T[]) {
  return values.filter(value => !!value);
}

export { convertStringsToNumbers, filterFalsy };
