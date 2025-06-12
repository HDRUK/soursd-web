import { ResearcherProject } from "@/types/application";
import { faker } from "@faker-js/faker";
import { mockedOrganisation } from "./organisation";
import { RequestFrequency } from "@/consts/projects";
import { type ProjectDetails } from "@/types/application";
import { mockedProjectUser } from "./custodian";

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

const mockedProjectDetails = (
  projectDetails?: Partial<ProjectDetails>
): ProjectDetails => ({
  id: 1,
  project_id: 4,
  datasets: '["dataset1"]',
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

const mockedProjectStateWorkflow = () => ({
  transitions: {
    "Form Received": ["Validation In Progress"],
  },
});

const mockedKanbanProjectUser = () => {
  const formReceived = [mockedProjectUser({ id: 1 })];

  const validationInProgressData = [
    mockedProjectUser({ id: 2, first_name: "Chevy", last_name: "Chase" }),
    mockedProjectUser({ id: 3, first_name: "Sigourney", last_name: "Weaver" }),
    mockedProjectUser({ id: 4, first_name: "John", last_name: "Smith" }),
    mockedProjectUser({ id: 5, first_name: "Will", last_name: "Weaton" }),
  ];

  const validationComplete = [
    mockedProjectUser({ id: 6, first_name: "Alexander", last_name: "Siddig" }),
  ];

  const infoRequested = [
    mockedProjectUser({ id: 7, first_name: "Colm", last_name: "Meaney" }),
  ];

  const escalation = [
    mockedProjectUser({ id: 8, first_name: "Michael", last_name: "Dorn" }),
  ];

  const validated = [
    mockedProjectUser({ id: 9, first_name: "Marina", last_name: "Sirtis" }),
  ];

  return {
    "Form Received": formReceived,
    "Validation In Progress": validationInProgressData,
    "Validation Complete": validationComplete,
    "More User Information Requested": infoRequested,
    "Escalation to Validation Committee": escalation,
    Validated: validated,
  };
};

export {
  mockedProjects,
  mockedProject,
  mockedProjectDetails,
  mockedKanbanProjectUser,
  mockedProjectStateWorkflow,
};
