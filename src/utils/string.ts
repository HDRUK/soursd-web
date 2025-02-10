function capitaliseFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const toCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

const anyIncludes = (value: string | null, list: string[]) => {
  return !!(
    value && list.find((listValue: string) => value.includes(listValue))
  );
};

export { capitaliseFirstLetter, toCamelCase, anyIncludes };
