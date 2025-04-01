import { ResearcherProject } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedOrganisation } from "./organisation";
import { RequestFrequency } from "@/consts/projects";
import { type ProjectDetails } from "@/types/application";

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

const mockedProjectDetails = (projectDetails?: Partial<ProjectDetails>): ProjectDetails => ({
  id: 1,
  project_id: 4,
  datasets: "[\"dataset1\"]",
  data_sensitivity_level: "Protected Data",
  legal_basis_for_data_article6: "Legal Basis",
  duty_of_confidentiality: true,
  national_data_optout: false,
  request_frequency: RequestFrequency.ONE_OFF,
  dataset_linkage_description: "Linkage Description",
  data_minimisation: "Data Minimisation",
  data_use_description: "Data Use Description",
  access_date: "2023-01-01",
  ...projectDetails,
});

export { mockedProjects, mockedProject, mockedProjectDetails };
