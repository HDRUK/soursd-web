import { act, fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { useRouter } from "next/navigation";
import { postRegister } from "@/services/auth";
import { AccountType } from "@/types/accounts";
import AccountConfirm from "./AccountConfirm";

jest.mock("@/data/store");

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

jest.mock("@/services/auth", () => ({
  postRegister: jest.fn(),
}));

const mockedReplace = jest.fn();

const TestComponent = () => {
  return <AccountConfirm />;
};

describe("<AccountConfirm />", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockedReplace,
    });

    (postRegister as jest.Mock).mockReset();
  });

  it("has no accessibility validations", async () => {
    const { container } = render(<TestComponent />);

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("should be two buttons for representing myself or an organisation", async () => {
    render(<AccountConfirm />);
    const optionButtons = screen.getAllByRole("button", { name: /represent/i });
    expect(optionButtons).toHaveLength(2);
  });

  it("button should be clickable only if an option is selected and terms are checked", async () => {
    render(<AccountConfirm />);

    // Select the elements
    const continueButton = screen.getByRole("button", { name: /continue/i });
    const termsCheckbox = screen.getByRole("checkbox");
    const optionButtons = screen.getAllByRole("button", { name: /represent/i });

    // Assert button is initially disabled
    expect(continueButton).toBeDisabled();

    // Select an account option
    fireEvent.click(optionButtons[0]);
    expect(continueButton).toBeDisabled(); // Still disabled because terms are unchecked

    // Check the terms checkbox
    fireEvent.click(termsCheckbox);
    expect(continueButton).toBeEnabled(); // Should now be enabled

    // Uncheck the terms checkbox
    fireEvent.click(termsCheckbox);
    expect(continueButton).toBeDisabled(); // Should be disabled again
  });

  it("select represent myself should register correct account type", async () => {
    render(<AccountConfirm />);

    // Select the elements
    const continueButton = screen.getByRole("button", { name: /continue/i });
    const termsCheckbox = screen.getByRole("checkbox");
    const optionMyself = screen.getByRole("button", {
      name: /represent myself/i,
    });

    fireEvent.click(optionMyself);
    fireEvent.click(termsCheckbox);

    await act(async () => {
      fireEvent.click(continueButton);
    });

    expect(postRegister).toHaveBeenCalledWith(
      { account_type: AccountType.USER },
      { error: { message: expect.any(String) } }
    );
    expect(mockedReplace).toHaveBeenCalledWith(
      expect.stringContaining("user/profile")
    );
  });

  it("select represent an organisation should register correct account type", async () => {
    render(<AccountConfirm />);

    // Select the elements
    const continueButton = screen.getByRole("button", { name: /continue/i });
    const termsCheckbox = screen.getByRole("checkbox");
    const optionOrganisation = screen.getByRole("button", {
      name: /represent an organisation/i,
    });

    fireEvent.click(optionOrganisation);
    fireEvent.click(termsCheckbox);

    await act(async () => {
      fireEvent.click(continueButton);
    });

    expect(postRegister).toHaveBeenCalledWith(
      { account_type: AccountType.ORGANISATION },
      { error: { message: expect.any(String) } }
    );

    expect(mockedReplace).toHaveBeenCalledWith(
      expect.stringContaining("organisation/profile")
    );
  });
});
