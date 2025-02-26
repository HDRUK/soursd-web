import { Position } from "@/consts/ui";
import { isPositionHorizontal, isPositionVertical } from "./styles";

describe("Style utils", () => {
  describe("isPositionVertical", () => {
    it("is false", async () => {
      expect(isPositionVertical(Position.RIGHT)).toEqual(false);
      expect(isPositionVertical(Position.LEFT)).toEqual(false);
    });

    it("is true", () => {
      expect(isPositionVertical(Position.BOTTOM)).toEqual(true);
      expect(isPositionVertical(Position.TOP)).toEqual(true);
    });
  });

  describe("isPositionHorizontal", () => {
    it("is false", async () => {
      expect(isPositionHorizontal(Position.TOP)).toEqual(false);
      expect(isPositionHorizontal(Position.BOTTOM)).toEqual(false);
    });

    it("is true", () => {
      expect(isPositionHorizontal(Position.LEFT)).toEqual(true);
      expect(isPositionHorizontal(Position.RIGHT)).toEqual(true);
    });
  });
});
