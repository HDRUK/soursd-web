import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import UserModalDetails, { UserModalDetailsProps } from "./UserModalDetails";

jest.mock("@/services/organisations");
jest.mock("@/data/store");

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

const mockedPayload = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  email: faker.internet.email(),
};

const renderUserModalDetails = (props?: Partial<UserModalDetailsProps>) => {
  return render(
    <UserModalDetails
      queryState={{ isLoading: false, isError: false, error: "" }}
      onSubmit={mockOnSubmit}
      onClose={mockOnClose}
      {...props}
    />
  );
};

const renderUserModalDetailsUpdate = () => {
  renderUserModalDetails();

  [
    { label: "First name", value: mockedPayload.first_name },
    { label: "Last name", value: mockedPayload.last_name },
    { label: "Email", value: mockedPayload.email },
  ].forEach(({ label, value }) => {
    const input = screen.getByLabelText(label);

    fireEvent.change(input, {
      target: { value },
    });
  });

  fireEvent.submit(screen.getByRole("button", { name: /Send invite/i }));
};

describe("<UserModalDetails />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("submit is called", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => {
      expect(mockOnSubmit.mock.lastCall[0]).toEqual(mockedPayload);
    });
  });

  it.each(["First name", "Last name", "Email"])(
    "does not submit when %s is not defined",
    async value => {
      renderUserModalDetails();

      const input = screen.getByLabelText(value);
      const inputValue = faker.string.sample();

      fireEvent.change(input, {
        target: { value: inputValue },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Send invite/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderUserModalDetails());
  });
});
