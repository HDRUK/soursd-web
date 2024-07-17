import {
  mockedFormattedSystemConfig,
  mockedSystemConfig,
} from "@/mocks/data/systemConfig";
import { parseSystemConfig } from "./application";

describe("Application utils", () => {
  describe("parseSystemConfig", () => {
    it("returns the correct formatted object", async () => {
      expect(parseSystemConfig(mockedSystemConfig())).toEqual(
        mockedFormattedSystemConfig()
      );
    });

    it("returns an empty object", async () => {
      expect(parseSystemConfig(undefined)).toEqual({});
    });
  });
});
