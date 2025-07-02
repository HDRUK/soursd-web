import { faker } from "@faker-js/faker";

const mockedAddress = () => ({
  address_1: faker.string.sample(),
  address_2: faker.string.sample(),
  town: faker.string.sample(),
  county: faker.string.sample(),
  country: faker.string.sample(),
  postcode: "RG6 1WG",
});

export { mockedAddress };
