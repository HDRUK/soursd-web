import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import SearchActionMenu from "./SearchActionMenu";

jest.mock("@mui/icons-material/FilterAlt", () => () => (
  <div data-testid="filter-icon" />
));

const mockHandleSortToggle = jest.fn();

const actions = [
  {
    label: "A-Z",
    onClick: mockHandleSortToggle,
  },
  {
    label: "Z-A",
    onClick: mockHandleSortToggle,
  },
];

const renderMenuOpen = () => {
  const rendered = render(
    <SearchActionMenu
      actions={actions}
      renderedSelectedLabel="Sorted by"
      renderedDefaultLabel="Sort by"
    />
  );

  fireEvent.mouseDown(screen.getByText("Sort by"));

  return rendered;
};

describe("SearchActionMenu", () => {
  beforeEach(() => {
    renderMenuOpen();
  });

  it("renders all actions correctly", async () => {
    await waitFor(() =>
      actions.forEach(action => {
        expect(screen.getByText(action.label)).toBeInTheDocument();
      })
    );
  });

  it("calls the correct handler on action click", () => {
    const sortAction = screen.getByText("A-Z");

    fireEvent.click(sortAction);

    expect(mockHandleSortToggle).toHaveBeenCalled();
  });
});
