import { mockedUser } from "@/mocks/data/user";
import { getInitialsFromUser, isOrcIdCompleted, isOrcIdScanning } from "./user";
import { faker } from "@faker-js/faker";

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

describe("isOrcIdScanning", () => {
  it("is scanning", () => {
    const user = mockedUser({
      orcid_scanning: true,
    });
    const result = isOrcIdScanning(user);

    expect(result).toBe(true);
  });

  it("isn't scanning", () => {
    const user = mockedUser({
      orcid_scanning: false,
    });
    const result = isOrcIdScanning(user);

    expect(result).toBe(false);
  });
});

describe("isOrcIdCompleted", () => {
  it("is completed", () => {
    const user = mockedUser({
      orcid_scanning_completed_at: faker.date.recent().toISOString(),
    });
    const result = isOrcIdCompleted(user);

    expect(result).toBe(true);
  });

  it("isn't scanning", () => {
    const user = mockedUser({
      orcid_scanning_completed_at: null,
    });
    const result = isOrcIdCompleted(user);

    expect(result).toBe(false);
  });
});
