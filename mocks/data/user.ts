import { UserGroup } from "@/consts/user";
import { ResearcherAccreditation, User } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedApproval } from "./approvals";
import { mockedFile } from "./file";
import { mockedPermission } from "./permission";

const mockedUser = (user?: Partial<User>): User => ({
  profile_completed_at: null,
  profile_steps_completed: "",
  id: 2,
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
  user_group: UserGroup.RESEARCHERS,
  permissions: [mockedPermission()],
  approvals: [mockedApproval()],
  organisations: [],
  registry: {
    files: [mockedFile()],
  },
  ...user,
});

const mockedAccreditation = (
  accreditation?: Partial<ResearcherAccreditation>
): ResearcherAccreditation => ({
  awarded_at: faker.commerce.department(),
  awarding_body_name: faker.company.name(),
  awarding_body_ror: faker.internet.url(),
  expires_at: faker.date.future().toDateString(),
  title: faker.string.sample(),
  awarded_locale: faker.location.country(),
  ...accreditation,
});

export { mockedAccreditation, mockedUser };
