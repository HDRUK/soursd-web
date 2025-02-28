import { ProjectEntities } from "@/services/projects/getEntityProjects";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  waitFor,
} from "@/utils/testUtils";
import Projects from ".";

const renderProjects = ({ variant }: { variant: ProjectEntities }) =>
  render(<Projects variant={variant} />);

describe("Organisation Projects", () => {
  it("display 10 projects", async () => {
    const { getAllByTestId } = renderProjects({
      variant: "organisation",
    });

    await waitFor(() => {
      const accordions = getAllByTestId(/^project-accordion-/);
      expect(accordions.length).toBe(10);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects({ variant: "organisation" }));
  });
});

describe("Custodian Projects", () => {
  it("display 5 projects", async () => {
    const { getAllByTestId } = renderProjects({
      variant: "custodian",
    });

    await waitFor(() => {
      const accordions = getAllByTestId(/^project-accordion-/);
      expect(accordions.length).toBe(5);
    });

    const expandIcons = getAllByTestId("ExpandMoreIcon");
    const expandIcon = expandIcons[0];
    fireEvent.click(expandIcon!);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderProjects({ variant: "custodian" }));
  });
});
