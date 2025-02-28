import { formatAddress } from "./address";

describe("formatAddress", () => {
  it("formats a complete address correctly", () => {
    const address = {
      address_1: "123 Fake St",
      address_2: "Apt 4B",
      town: "Springfield",
      postcode: "12345",
      country: "USA",
    };

    const result = formatAddress(address);

    expect(result).toBe("123 Fake St, Apt 4B, Springfield, 12345, USA");
  });

  it("removes null or undefined fields", () => {
    const address = {
      address_1: "123 Fake St",
      address_2: undefined,
      town: "Springfield",
      postcode: undefined,
      country: "USA",
    };

    const result = formatAddress(address);

    expect(result).toBe("123 Fake St, Springfield, USA");
  });

  it("handles an address with only one field", () => {
    const address = {
      address_1: "123 Fake St",
      address_2: undefined,
      town: undefined,
      postcode: undefined,
      country: undefined,
    };

    const result = formatAddress(address);

    expect(result).toBe("123 Fake St");
  });

  it("returns an empty string if all fields are null or undefined", () => {
    const address = {
      address_1: undefined,
      address_2: undefined,
      town: undefined,
      postcode: undefined,
      country: undefined,
    };

    const result = formatAddress(address);

    expect(result).toBe("");
  });
});
