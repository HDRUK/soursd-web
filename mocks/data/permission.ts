import { Permission } from "@/services/permissions/types";
import { faker } from "@faker-js/faker";

const mockedPermission = (permission?: Partial<Permission>): Permission => ({
  id: 2,
  name: faker.company.buzzNoun(),
  enabled: faker.number.int(),
  created_at: faker.date.past().toString(),
  updated_at: faker.date.recent().toString(),
  pivot: {
    organisation_id: faker.number.int(),
    permission_id: faker.number.int(),
  },
  ...permission,
});

export { mockedPermission };
