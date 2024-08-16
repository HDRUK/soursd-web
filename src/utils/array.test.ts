import { convertStringsToNumbers, filterFalsy } from "./array";

describe("convertStringsToNumbers", () => {
  it("returns an array of number", () => {
    const result = convertStringsToNumbers(["1"]);

    expect(result).toEqual([1]);
  });
});

describe("filterFalsy", () => {
  it("invalidates the roles", () => {
    const arrayToFilter = ["value1", "", "value3"];

    const result = filterFalsy(arrayToFilter);

    expect(result).toEqual([arrayToFilter[0], arrayToFilter[2]]);
  });
});
