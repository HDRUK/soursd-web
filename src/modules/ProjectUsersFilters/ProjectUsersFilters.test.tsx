import {
  act,
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/testUtils";
import ProjectUsersFilters, {
  ProjectUsersFiltersProps,
} from "./ProjectUsersFilters";

const defaultProps = {
  updateQueryParams: jest.fn(),
  resetQueryParams: jest.fn(),
  handleSortToggle: jest.fn(),
  handleFieldToggle: jest.fn(),
  queryParams: {},
  statusList: ["form_received", "validated"],
};

const setupTest = (props?: Partial<ProjectUsersFiltersProps>) => {
  return render(<ProjectUsersFilters {...defaultProps} {...props} />);
};

describe("<ProjectUsersFilters />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits a search", async () => {
    setupTest();

    await act(async () => {
      const searchInput = screen.getByRole("textbox");

      await userEvent.type(searchInput, "hdruk{enter}");
    });

    await waitFor(() => {
      expect(defaultProps.updateQueryParams).toHaveBeenCalledWith({
        "name[]": "hdruk",
      });
    });
  });

  it("filters a search", async () => {
    setupTest();

    act(() => {
      changeSelectValueByLabelText(/Filter by status/, "Form received");
    });

    await waitFor(() => {
      expect(defaultProps.handleFieldToggle).toHaveBeenCalledWith(
        "filter",
        ["form_received", ""],
        true
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
