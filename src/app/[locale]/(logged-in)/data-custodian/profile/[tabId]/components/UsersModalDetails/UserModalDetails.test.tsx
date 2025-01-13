import { useStore } from "@/data/store";
import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
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

  it.each(["First name", "Last name", "Email"])(
    "does not submit when %s is not defined",
    async value => {
      renderUserModalDetails();

      const input = screen.getByLabelText(value);
      const inputValue = faker.string.sample();

      fireEvent.change(input, {
        target: { value: inputValue },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

      expect(mockOnSubmit).not.toHaveBeenCalled();
    }
  );
});
