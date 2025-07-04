import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { faker } from "@faker-js/faker";
import { useTranslations } from "next-intl";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "../../utils/testUtils";
import CustodianEditContactForm, {
  CustodianEditContactFormProps,
} from "./CustodianEditContactForm";

jest.mock("../../services/custodians");

const defaultProps = {
  user: mockedCustodianUser({
    user_permissions: [
      {
        permission_id: 10,
      },
    ],
  }),
  permissions: mockedApiPermissions,
  queryState: { isLoading: false, isError: false, error: "" },
  onSubmit: jest.fn(),
  onClose: jest.fn(),
};

const TestComponent = (props?: Partial<CustodianEditContactFormProps>) => {
  const t = useTranslations("CustodianProfile.EditContact");

  return <CustodianEditContactForm {...defaultProps} t={t} {...props} />;
};

const setupTest = (props?: Partial<CustodianEditContactFormProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<CustodianEditContactForm />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("submit is called", async () => {
    setupTest();

    const { email, first_name, last_name } = defaultProps.user;

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        email,
        first_name,
        last_name,
        administrator: true,
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

      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    }
  );

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
