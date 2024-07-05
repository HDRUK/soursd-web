import { mockedUser } from "@/mocks/data/user";
import { getInitialsFromUser } from "./user";

describe("getInitialsFromUser", () => {
  it("gets the correct initials", () => {
    const user = mockedUser({
      first_name: "John",
      last_name: "Smith",
    });
    const result = getInitialsFromUser(user);

    expect(result).toEqual("JS");
  });
});
