import { Status } from "@/components/ChipStatus";
import { act, render, screen, userEvent, waitFor } from "@/utils/testUtils";
import ProjectsFilters, { ProjectsFiltersProps } from "./ProjectsFilters";

const defaultProps = {
  updateQueryParams: jest.fn(),
  resetQueryParams: jest.fn(),
  handleSortToggle: jest.fn(),
  handleFieldToggle: jest.fn(),
  queryParams: {},
};

const setupTest = (props?: Partial<ProjectsFiltersProps>) => {
  render(<ProjectsFilters {...defaultProps} {...props} />);
};

describe("<ProjectsFilters />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits a search", async () => {
    setupTest();

    act(() => {
      const searchInput = screen.getByRole("textbox");

      userEvent.type(searchInput, "hdruk{enter}");
    });

    await waitFor(() => {
      expect(defaultProps.updateQueryParams).toHaveBeenCalledWith({
        "title[]": "hdruk",
      });
    });
  });

  it("filters by date", async () => {
    setupTest();

    act(() => {
      changeSelectValueByLabelText(/Filter by date/, "Past projects");
    });

    await waitFor(() => {
      expect(defaultProps.handleFieldToggle).toHaveBeenCalledWith("active", [
        "1",
        undefined,
      ]);
    });
  });

  it("filters by status", async () => {
    setupTest();

    act(() => {
      changeSelectValueByLabelText(/Filter by status/, "Approved");
    });

    await waitFor(() => {
      expect(defaultProps.handleFieldToggle).toHaveBeenCalledWith(
        "filter",
        [Status.PROJECT_APPROVED, undefined],
        true
      );
    });
  });
});
