import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import UserModalDetails, { UserModalDetailsProps } from "./UserModalDetails";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(mockedApiPermissions);

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();
const defaultUser = mockedCustodianUser();

const renderUserModalDetails = (props?: Partial<UserModalDetailsProps>) => {
  return render(
    <UserModalDetails
      user={defaultUser}
      queryState={{ isLoading: false, isError: false, error: "" }}
      onSubmit={mockOnSubmit}
      onClose={mockOnClose}
      {...props}
    />
  );
};

describe("<UserModalDetails />", () => {
  afterEach(() => {
    mockOnSubmit.mockReset();
    mockOnClose.mockReset();
  });

  it("submit is called", async () => {
    renderUserModalDetails();

    const { email, first_name, last_name } = defaultUser;

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit.mock.lastCall[0]).toEqual({
        email,
        first_name,
        last_name,
        administrator: false,
        approver: false,
      });
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

      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderUserModalDetails());
  });
});
