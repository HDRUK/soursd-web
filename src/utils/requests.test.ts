import { faker } from "@faker-js/faker";
import { objectToQuerystring } from "./requests";

const mockPayload = {
  query: faker.string.alphanumeric(),
};

describe("Requests utils", () => {
  it("objectToQuerystring", async () => {
    const queryString = objectToQuerystring(mockPayload);

    expect(queryString).toEqual(`query=${mockPayload.query}`);
  });
});
