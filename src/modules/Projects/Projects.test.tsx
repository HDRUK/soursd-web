import { ProjectEntities } from "../../services/projects/getEntityProjects";
import {
  commonAccessibilityTests,
  render,
  waitFor,
} from "../../utils/testUtils";
import Projects from ".";

const renderProjects = ({ variant }: { variant: ProjectEntities }) =>
  render(<Projects variant={variant} />);

describe("Organisation Projects", () => {
  it("display 10 projects", async () => {
    const { getAllByRole, getByText } = renderProjects({
      variant: "organisation",
    });

    await waitFor(() => {
      expect(getByText("Project Name")).toBeInTheDocument();
      const rows = getAllByRole("row");
      expect(rows.slice(1).length).toBe(10);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects({ variant: "organisation" }));
  });
});

describe("Custodian Projects", () => {
  it("display 5 projects", async () => {
    const { getAllByRole, getByText } = renderProjects({
      variant: "custodian",
    });

    await waitFor(() => {
      expect(getByText("Project Name")).toBeInTheDocument();
      const rows = getAllByRole("row");
      expect(rows.slice(1).length).toBe(5);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects({ variant: "custodian" }));
  });
});

describe("User Projects", () => {
  it("display 7 projects", async () => {
    const { getAllByRole, getByText } = renderProjects({
      variant: "user",
    });

    await waitFor(() => {
      expect(getByText("Project Name")).toBeInTheDocument();
      const rows = getAllByRole("row");
      expect(rows.slice(1).length).toBe(7);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects({ variant: "user" }));
  });
});
