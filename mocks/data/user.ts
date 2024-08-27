import { UserGroup } from "@/consts/user";
import {
  ResearcherAccreditation,
  ResearcherEducation,
  ResearcherEmployment,
  ResearcherProject,
  ResearcherTraining,
  User,
} from "@/types/application";
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

const mockedTraining = (
  training?: Partial<ResearcherTraining>
): ResearcherTraining => ({
  awarded_at: faker.commerce.department(),
  provider: faker.company.name(),
  awarding_body_ror: faker.internet.url(),
  expires_at: faker.date.future().toDateString(),
  training_name: faker.string.sample(),
  expires_in_years: false,
  ...training,
});

const mockedEmployment = (
  employment?: Partial<ResearcherEmployment>
): ResearcherEmployment => ({
  department: faker.commerce.department(),
  employer_name: faker.company.name(),
  ror: faker.internet.url(),
  from: faker.date.past().toDateString(),
  to: faker.date.future().toDateString(),
  role: faker.string.sample(),
  is_current: false,
  ...employment,
});

const mockedEducation = (
  education?: Partial<ResearcherEducation>
): ResearcherEducation => ({
  institute_name: faker.commerce.department(),
  institute_address: faker.location.streetAddress(),
  institute_indentifier: faker.string.sample(),
  from: faker.date.past().toDateString(),
  to: faker.date.future().toDateString(),
  title: faker.string.sample(),
  source: faker.string.sample(),
  ...education,
});

const mockedProject = (
  project?: Partial<ResearcherProject>
): ResearcherProject => ({
  title: faker.string.sample(),
  lay_summary: faker.string.sample(),
  public_benefit: faker.string.sample(),
  technical_summary: faker.string.sample(),
  start_date: faker.date.past().toDateString(),
  end_date: faker.date.future().toDateString(),
  request_category_type: faker.string.sample(),
  other_approval_committees: faker.string.sample(),
  ...project,
});

export {
  mockedAccreditation,
  mockedUser,
  mockedTraining,
  mockedEmployment,
  mockedEducation,
  mockedProject,
};
