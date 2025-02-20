import { faker } from "@faker-js/faker";
import { Department } from "@/types/application";

const mockedDepartment = (department?: Partial<Department>): Department => ({
  id: faker.number.int(),
  created_at: faker.date.soon().toString(),
  updated_at: faker.date.soon().toString(),
  name: faker.company.name(),
  category: faker.string.sample(),
  pivot: {
    organisation_id: faker.number.int(),
    department_id: faker.number.int(),
  },
  ...department,
});

export { mockedDepartment };
