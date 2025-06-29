import { EntityType } from "@/types/api";
import { render } from "@/utils/testUtils";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import ProjectOrganisations from "./ProjectOrganisations";

jest.mock("@/organisms/ProjectOrganisationsBoard", () => () => (
  <div>ProjectOrganisationsBoard</div>
));

const defaultProps = {
  custodianId: 1,
  routes: { name: { path: "/profile" } },
  variant: EntityType.CUSTODIAN,
};

const setupTest = () => {
  render(<ProjectOrganisations {...defaultProps} />);
};

describe("ProjectOrganisations", () => {
  it("renders the Kanban board by default", async () => {
    setupTest();

    await waitFor(() => {
      expect(screen.getByText("ProjectOrganisationsBoard")).toBeInTheDocument();
    });
  });

  it("has the correct headers", async () => {
    setupTest();

    const toggleButton = screen.getByText("Switch to list view");
    fireEvent.click(toggleButton);

    const rows = await screen.findAllByRole("row");
    const thRow = within(rows[0]);

    await waitFor(() => {
      expect(thRow.getByText("Organisation name")).toBeInTheDocument();
    });

    expect(thRow.getByText("Project name")).toBeInTheDocument();
    expect(thRow.getByText("Senior Responsible Officer")).toBeInTheDocument();
    expect(thRow.getByText("Validation status")).toBeInTheDocument();
  });

  it("has the correct number of rows", async () => {
    setupTest();

    const toggleButton = screen.getByText("Switch to list view");
    fireEvent.click(toggleButton);

    const rows = await screen.findAllByRole("row");

    expect(rows).toHaveLength(2);
  });
});
