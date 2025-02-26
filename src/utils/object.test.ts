import { isEmpty } from "./object";

describe("Object utils", () => {
  describe("isEmpty", () => {
    it("is false", async () => {
      expect(isEmpty({ key: "value" })).toEqual(false);
    });

    it("is true", () => {
      expect(isEmpty({})).toEqual(true);
    });
  });
});
