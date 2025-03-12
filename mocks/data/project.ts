import { ResearcherProject } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedOrganisation } from "./organisation";

const mockedProject = (
  project?: Partial<ResearcherProject>
): ResearcherProject => ({
  id: faker.number.int(),
  title: faker.string.sample(),
  lay_summary: faker.string.sample(),
  public_benefit: faker.string.sample(),
  technical_summary: faker.string.sample(),
  start_date: faker.date.past().toDateString(),
  end_date: faker.date.future().toDateString(),
  request_category_type: faker.string.sample(),
  other_approval_committees: faker.string.sample(),
  organisations: [mockedOrganisation()],
  ...project,
});

const mockedProjects = (count: number): ResearcherProject[] => {
  return Array.from({ length: count }, () => mockedProject());
};

export { mockedProjects, mockedProject };
