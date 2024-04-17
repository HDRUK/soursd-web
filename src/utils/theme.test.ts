import { colorToRgba } from "./theme";

describe("colorToRgba", () => {
  it("converts hex to rgba", async () => {
    const result = colorToRgba("#ffffff");

    expect(result).toEqual("rgba(255, 255, 255, 1)");
  });

  it("converts rgb to rgba", async () => {
    const result = colorToRgba("rgb(255, 255, 255)", 0.5);

    expect(result).toEqual("rgba(255, 255, 255, 0.5)");
  });
});
