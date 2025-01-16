import {
  act,
  within,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
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
    { testId: "first_name", value: mockedPayload.first_name },
    { testId: "last_name", value: mockedPayload.last_name },
    { testId: "email", value: mockedPayload.email },
  ].forEach(({ testId, value }) => {
    const parentDiv = screen.getByTestId(testId);
    const input = within(parentDiv).getByRole("textbox");

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

  it("has no accessibility validations", async () => {
    const { container } = renderUserModalDetails();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("submit is called", async () => {
    renderUserModalDetailsUpdate();

    await waitFor(() => {
      expect(mockOnSubmit.mock.lastCall[0]).toEqual(mockedPayload);
    });
  });

  it.each(["first_name", "last_name", "email"])(
    "does not submit when %s is not defined",
    async testId => {
      renderUserModalDetails();

      const parentDiv = screen.getByTestId(testId);
      const input = within(parentDiv).getByRole("textbox");

      const inputValue = faker.string.sample();

      fireEvent.change(input, {
        target: { value: inputValue },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Send invite/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    }
  );
});
