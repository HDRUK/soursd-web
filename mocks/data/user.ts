import { UserGroup } from "@/consts/user";
import { User } from "@/services/auth";
import { faker } from "@faker-js/faker";
import { mockedFile } from "./file";
import { mockedPermission } from "./permission";
import { mockedApproval } from "./approvals";

const mockedUser = (user?: Partial<User>): User => ({
  id: 2,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  user_group: UserGroup.RESEARCHERS,
  permissions: [mockedPermission()],
  approvals: [mockedApproval()],
  registry: {
    files: [mockedFile()],
  },
  ...user,
});

export { mockedUser };
