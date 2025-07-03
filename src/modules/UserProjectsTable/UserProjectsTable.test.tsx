import { render, screen } from "@/utils/testUtils";
import { mockedProject } from "@/mocks/data/project";
import { useTranslations } from "next-intl";
import UserProjectsTable, { UserProjectsTableProps } from "./UserProjectsTable";

const project = mockedProject();

const TestComponent = (props?: Partial<UserProjectsTableProps>) => {
  const t = useTranslations("Projects.UserProjects");

  return (
    <UserProjectsTable
      t={t}
      data={[]}
      {...props}
      total={props?.data?.length || 0}
    />
  );
};

const setupTest = (props?: Partial<UserProjectsTableProps>) => {
  render(<TestComponent {...props} />);
};

describe("<UserProjectsTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [project],
    });

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(
      screen.getByText(project.organisations[0].organisation_name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(project.model_state.state.slug, "i"))
    ).toBeInTheDocument();
  });
});
