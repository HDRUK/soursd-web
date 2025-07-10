import { act, render, screen, waitFor } from "../../utils/testUtils";
import SearchActionMenu from "./SearchActionMenu";

jest.mock("@mui/icons-material/FilterAlt", () => () => (
  <div data-testid="filter-icon" />
));

const mockHandleSortToggle = jest.fn();

const actions = [
  {
    label: "Approved",
    onClick: mockHandleSortToggle,
  },
  {
    label: "Pending",
    onClick: mockHandleSortToggle,
  },
];

const setupTest = async () => {
  return render(
    <SearchActionMenu
      actions={actions}
      renderedSelectedLabel="Filtered by status"
      renderedDefaultLabel="Filter by status"
      aria-label="Filter by"
    />
  );
};

describe("SearchActionMenu", () => {
  beforeEach(() => {
    setupTest();
  });

  it("renders all actions correctly", async () => {
    act(() => {
      openSelectByLabelText(/Filter by/);
    });

    await waitFor(() =>
      actions.forEach(action => {
        expect(
          screen.getByLabelText(new RegExp(action.label, "i"))
        ).toBeInTheDocument();
      })
    );
  });

  it("calls the correct handler on action click", async () => {
    act(() => {
      changeSelectValueByLabelText(/Filter by/, "Approved", {
        component: "ActionList",
      });
    });

    await waitFor(() => {
      expect(mockHandleSortToggle).toHaveBeenCalled();
    });
  });
});
