import { countries } from "countries-list";
import { Option } from "../types/common";
import { getCountryCode, getCountryOptions } from "./countries";

describe("getCountryCode", () => {
  it("should return the correct country code for a valid country name", () => {
    expect(getCountryCode("United States")).toBe("US");
    expect(getCountryCode("India")).toBe("IN");
    expect(getCountryCode("Canada")).toBe("CA");
  });

  it("should return null for an invalid country name", () => {
    expect(getCountryCode("Neverland")).toBeNull();
    expect(getCountryCode("Atlantis")).toBeNull();
  });

  it("should be case insensitive", () => {
    expect(getCountryCode("united states")).toBe("US");
    expect(getCountryCode("india")).toBe("IN");
    expect(getCountryCode("CANADA")).toBe("CA");
  });
});

describe("getCountryOptions", () => {
  it("should return an array of country options", () => {
    const options: Option[] = getCountryOptions();
    expect(Array.isArray(options)).toBe(true);
    expect(options.length).toBe(Object.keys(countries).length);
  });

  it("should contain valid country codes and names", () => {
    const options: Option[] = getCountryOptions();
    expect(options).toEqual(
      expect.arrayContaining([
        { value: "US", label: "United States" },
        { value: "IN", label: "India" },
        { value: "CA", label: "Canada" },
      ])
    );
  });

  it("should be sorted alphabetically by label", () => {
    const options: Option[] = getCountryOptions();
    const sortedOptions = [...options].sort((a, b) =>
      a.label.localeCompare(b.label)
    );
    expect(options).toEqual(sortedOptions);
  });
});
