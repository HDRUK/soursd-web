import theme from "@/theme";
import { colorToRgba, isLightMode } from "./theme";

describe("colorToRgba", () => {
  it("converts hex to rgba", () => {
    const result = colorToRgba("#ffffff");

    expect(result).toEqual("rgba(255, 255, 255, 1)");
  });

  it("converts rgb to rgba", () => {
    const result = colorToRgba("rgb(255, 255, 255)", 0.5);

    expect(result).toEqual("rgba(255, 255, 255, 0.5)");
  });
});

describe("isLightMode", () => {
  it("is light mode", () => {
    expect(isLightMode(theme)).toBe(true);
  });
});
