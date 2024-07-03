import { User } from "@/services/auth";
import { faker } from "@faker-js/faker";
import { mockedFile } from "./file";

const mockedUser = (): User => ({
  id: 2,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  user_group: "RESEARCHERS",
  registry: {
    files: [mockedFile()],
  },
});

export { mockedUser };
