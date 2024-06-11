import { EntityType } from "@/types/api";
import { faker } from "@faker-js/faker";

const mockedUser = () => ({
  id: 2,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  user_group: EntityType.researchers,
});

export { mockedUser };
