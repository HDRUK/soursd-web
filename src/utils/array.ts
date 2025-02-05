function convertStringsToNumbers(values: string[]) {
  return values.map(value => +value);
}

function filterFalsy<T>(values: T[]) {
  return values.filter(value => !!value);
}

function binaryHas<T>(values: T[] | undefined) {
  return (values?.length ?? 0 > 1) ? 1 : 0;
}

export { convertStringsToNumbers, filterFalsy, binaryHas };
