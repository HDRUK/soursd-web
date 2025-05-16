import {
  commonAccessibilityTests,
  render,
  waitFor,
  screen,
  fireEvent,
} from "../../utils/testUtils";
import { mockedOrganisation } from "@/mocks/data/organisation";
import SelectDepartments from "./SelectDepartments";

const mockOrganisation = mockedOrganisation();

describe("<SelectDepartments />", () => {
  it("renders without crashing", () => {
    render(<SelectDepartments organisation={mockOrganisation} />);
  });

  it("renders the correct department options", async () => {
    render(<SelectDepartments organisation={mockOrganisation} />);
    fireEvent.mouseDown(screen.getByRole("combobox"));

    await waitFor(() => {
      expect(screen.getByText("Clinical Research")).toBeInTheDocument();
      expect(
        screen.getByText("Biostatistics and Data Science")
      ).toBeInTheDocument();
    });
  });

  it("calls onChange when a department is selected", () => {
    const handleChange = jest.fn();
    render(
      <SelectDepartments
        organisation={mockOrganisation}
        onChange={handleChange}
      />
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Clinical Research"));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(
      render(<SelectDepartments organisation={mockOrganisation} />)
    );
  });
});
