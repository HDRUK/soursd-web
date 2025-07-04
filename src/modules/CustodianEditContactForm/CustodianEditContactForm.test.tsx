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
import { useTranslations } from "next-intl";
import CustodianEditContactForm, {
  CustodianEditContactFormProps,
} from "./CustodianEditContactForm";

jest.mock("@/services/custodians");
jest.mock("@/data/store");

(useStore as unknown as jest.Mock).mockReturnValue(mockedApiPermissions);

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();
const defaultUser = mockedCustodianUser();

const TestComponent = (props?: Partial<CustodianEditContactFormProps>) => {
  const t = useTranslations("CustodianProfile.EditContact");

  return (
    <CustodianEditContactForm
      user={defaultUser}
      queryState={{ isLoading: false, isError: false, error: "" }}
      onSubmit={mockOnSubmit}
      onClose={mockOnClose}
      t={t}
      {...props}
    />
  );
};

const setupTest = (props?: Partial<CustodianEditContactFormProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<CustodianEditContactForm />", () => {
  afterEach(() => {
    mockOnSubmit.mockReset();
    mockOnClose.mockReset();
  });

  it("submit is called", async () => {
    setupTest();

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
      setupTest();

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
    commonAccessibilityTests(setupTest());
  });
});
