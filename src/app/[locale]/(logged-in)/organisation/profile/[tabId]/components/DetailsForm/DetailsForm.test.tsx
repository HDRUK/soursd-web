import { useStore } from "@/data/store";
import { mockedOrganisation } from "@/mocks/data/organisation";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import DetailsForm, { DetailsFormProps } from "./DetailsForm";

jest.mock("@/data/store");

const mockOnSubmit = jest.fn();
const defaultOrganisation = mockedOrganisation();

(useStore as unknown as jest.Mock).mockImplementation(() => ({
  organisation: defaultOrganisation,
  sectors: [],
}));

const renderUserModalDetails = (props?: Partial<DetailsFormProps>) => {
  return render(
    <DetailsForm
      queryState={{ isLoading: false, isError: false, error: "" }}
      onSubmit={mockOnSubmit}
      {...props}
    />
  );
};

describe("<UserModalDetails />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submit is called", async () => {
    renderUserModalDetails();

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it.each([
    "Organisation name",
    "Address 1",
    "Town",
    "County",
    "Postcode",
    "Company number",
    "Charity registration ID",
    "ROR ID",
    "Website",
  ])("does not submit when %s is not defined", async value => {
    renderUserModalDetails();

    const input = screen.getByLabelText(value);
    const inputValue = faker.string.sample();

    fireEvent.change(input, {
      target: { value: inputValue },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderUserModalDetails());
  });
});
