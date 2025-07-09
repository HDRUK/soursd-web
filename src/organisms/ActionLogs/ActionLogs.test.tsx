import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import { screen, render, userEvent } from "../../utils/testUtils";
import ActionLogs from "./ActionLogs";
import { ActionLogEntity } from "../../types/logs";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockLogs = (count: number, completed = false): ActionLogEntity[] =>
  Array.from({ length: count }, (_, i) => ({
    id: faker.number.int(),
    action: `action_test_${i}`,
    completed_at: completed ? faker.date.recent().toISOString() : null,
  })) as unknown as ActionLogEntity[];

describe("<ActionLogs />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders incomplete actions as action items", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: mockLogs(2, false) },
    });

    render(
      <ActionLogs
        variant="organisation"
        panelProps={{ heading: "Action Logs Test" }}
      />
    );

    const heading = screen.getByText("ActionLogs.actionTest_0.title");
    expect(heading).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: "ActionLogs.actionTest_0.buttonText",
    });
    expect(button).toBeInTheDocument();
  });

  it("renders completed actions in accordion", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: mockLogs(2, true) },
    });

    render(
      <ActionLogs
        variant="organisation"
        panelProps={{ heading: "Action Log Test" }}
      />
    );

    const accordionSummary = screen.getByText("Completed Actions");
    expect(accordionSummary).toBeInTheDocument();

    let completedItem = screen.getByText("ActionLogs.actionTest_0.title");
    expect(completedItem).not.toBeVisible();

    await userEvent.click(accordionSummary);

    completedItem = screen.getByText("ActionLogs.actionTest_0.title");
    expect(completedItem).toBeVisible();
  });

  it("renders nothing if no actions are returned", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: [] },
    });

    const { container } = render(
      <ActionLogs
        variant="organisation"
        panelProps={{ heading: "Empty panel" }}
      />
    );

    expect(container).not.toHaveTextContent("ActionLogs.actionTest_0.title");
  });

  it("does not render actions listed in hiddenActions prop", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            id: faker.number.int(),
            action: "add_users_completed", // Should be hidden
            completed_at: null,
          },
          {
            id: faker.number.int(),
            action: "visible_action", // Should be shown
            completed_at: null,
          },
        ],
      },
    });

    render(
      <ActionLogs
        variant="organisation"
        panelProps={{ heading: "Hidden Actions Test" }}
        hiddenActions={["add_users_completed"]}
      />
    );

    expect(
      screen.queryByText("ActionLogs.visibleAction.title")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("ActionLogs.addUsersCompleted.title")
    ).not.toBeInTheDocument();
  });
});
