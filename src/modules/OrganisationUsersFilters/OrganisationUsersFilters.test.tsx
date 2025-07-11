import {
  act,
  commonAccessibilityTests,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/testUtils";
import OrganisationUsersFilters, {
  OrganisationUsersFiltersProps,
} from "./OrganisationUsersFilters";

const defaultProps = {
  updateQueryParams: jest.fn(),
  resetQueryParams: jest.fn(),
  handleFieldToggle: jest.fn(),
  statusList: ["approved", "pending"],
  queryParams: {},
};

const setupTest = (props?: Partial<OrganisationUsersFiltersProps>) => {
  return render(<OrganisationUsersFilters {...defaultProps} {...props} />);
};

describe("<OrganisationUsersFilters />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders warning message if no project details", async () => {
    setupTest();

    await act(async () => {
      const searchInput = screen.getByRole("textbox");

      await userEvent.type(searchInput, "hdruk{enter}");
    });

    await waitFor(() => {
      expect(defaultProps.updateQueryParams).toHaveBeenCalledWith({
        "email[]": "hdruk",
        "name[]": "hdruk",
      });
    });
  });

  it("renders warning message if no project details", async () => {
    setupTest();

    act(() => {
      changeSelectValueByLabelText("Filter by status", "Pending", {
        component: "ActionList",
      });
    });

    await waitFor(() => {
      expect(defaultProps.handleFieldToggle).toHaveBeenCalledWith(
        "filter",
        ["pending", ""],
        true
      );
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
