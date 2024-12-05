import { useStore } from "@/data/store";
import {
  mockedDataCustodian,
  mockedDataCustodianUser,
} from "@/mocks/data/issuer";
import { mockedUser } from "@/mocks/data/user";
import { patchIssuer } from "@/services/issuers";
import { act, fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { axe } from "jest-axe";
import UserModalDetails, { UserModalDetailsProps } from "./UserModalDetails";

jest.mock("@/services/issuers");
jest.mock("@/data/store");

const mockOnSubmit = jest.fn();
const defaultUser = mockedDataCustodianUser();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultUser,
  null,
]);

const renderUserModalDetails = (props?: Partial<UserModalDetailsProps>) => {
  return render(
    <UserModalDetails
      user={defaultUser}
      queryState={{ isLoading: false, isError: false, error: "" }}
      onSubmit={mockOnSubmit}
      {...props}
    />
  );
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
    renderUserModalDetails();

    const { email, first_name, last_name } = defaultUser;

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit.mock.lastCall[0]).toEqual({
        email,
        first_name,
        last_name,
        adminstrator: undefined,
        approver: undefined,
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
