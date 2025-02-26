import { escapeAndParse } from "./json";

describe("Json utils", () => {
  describe("escapeAndParse", () => {
    it("returns the correct formatted object", async () => {
      const data = `{ "value": "^[\\d]$" }`;

      expect(escapeAndParse(data)).toEqual({
        value: `^[\\d]$`,
      });
    });
  });
});
