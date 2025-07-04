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
};

const setupTest = (props?: Partial<OrganisationUsersFiltersProps>) => {
  return render(<OrganisationUsersFilters {...defaultProps} {...props} />);
};

describe("<OrganisationUsersFilters />", () => {
  it("renders warning message if no project details", async () => {
    setupTest();

    act(() => {
      const searchInput = screen.getByRole("textbox");

      userEvent.type(searchInput, "hdruk{enter}");
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
      const filterCheckbox = screen.getByLabelText("Show pending invites");

      userEvent.click(filterCheckbox);
    });

    await waitFor(() => {
      expect(defaultProps.updateQueryParams).toHaveBeenCalledWith({
        show_pending: 1,
      });
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
