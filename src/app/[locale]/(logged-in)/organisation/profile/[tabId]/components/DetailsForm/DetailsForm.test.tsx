import { useStore } from "@/data/store";
import { mockedOrganisation } from "@/mocks/data/organisation";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
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

  it("has no accessibility validations", async () => {
    const { container } = renderUserModalDetails();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("submit is called", async () => {
    renderUserModalDetails();

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it.each([
    "organisation_name",
    "address_1",
    "town",
    "county",
    "postcode",
    "companies_house_no",
    "charity_registration_id",
    "ror_id",
    "website",
  ])("does not submit when %s is not defined", async testId => {
    renderUserModalDetails();

    const parentDiv = screen.getByTestId(testId);
    const input = within(parentDiv).getByRole("textbox");
    const inputValue = faker.string.sample();

    fireEvent.change(input, {
      target: { value: inputValue },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
