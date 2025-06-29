import { EntityType } from "@/types/api";
import { render } from "@/utils/testUtils";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import ProjectUsers from "./ProjectUsers";

jest.mock("@/organisms/ProjectUsersBoard", () => () => (
  <div>ProjectUsersBoard</div>
));

const defaultProps = {
  custodianId: 1,
  projectId: 2,
  routes: { name: { path: "/profile" } },
  variant: EntityType.CUSTODIAN,
};

const setupTest = () => {
  render(<ProjectUsers {...defaultProps} />);
};

describe("ProjectUsers", () => {
  it("renders the Kanban board by default", async () => {
    setupTest();

    await waitFor(() => {
      expect(screen.getByText("ProjectUsersBoard")).toBeInTheDocument();
    });
  });

  it("shows add user modal when add button is clicked", async () => {
    setupTest();

    const addButton = screen.getByText(/Add a new member/);
    fireEvent.click(addButton);

    expect(screen.getByTestId("form-modal")).toBeInTheDocument();
  });

  it("has the correct headers", async () => {
    setupTest();

    const toggleButton = screen.getByText("Switch to list view");
    fireEvent.click(toggleButton);

    const rows = await screen.findAllByRole("row");
    const thRow = within(rows[0]);

    await waitFor(() => {
      expect(thRow.getByText("Project role")).toBeInTheDocument();
    });

    expect(thRow.getByText("Project name")).toBeInTheDocument();
    expect(thRow.getByText("Name")).toBeInTheDocument();
    expect(thRow.getByText("Actions")).toBeInTheDocument();
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
