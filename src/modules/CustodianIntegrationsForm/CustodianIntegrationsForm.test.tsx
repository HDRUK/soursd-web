import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";

import { getRandomString } from "@/utils/string";
import { useTranslations } from "next-intl";
import CustodianIntegrationsForm, {
  CustodianIntegrationsFormProps,
} from "./CustodianIntegrationsForm";

const defaultProps: CustodianIntegrationsFormProps = {
  mutateState: { isPending: false, isError: false, isSuccess: false },
  onSubmit: jest.fn(),
  defaultValues: {
    gateway_app_id: getRandomString(40),
    gateway_client_id: getRandomString(40),
  },
};

const TestComponent = (props?: Partial<CustodianIntegrationsFormProps>) => {
  const t = useTranslations("CustodianProfile.Integrations");

  return <CustodianIntegrationsForm {...defaultProps} {...props} t={t} />;
};

const setupTest = (props?: Partial<CustodianIntegrationsFormProps>) => {
  return render(<TestComponent {...props} />);
};

function getAllInputs() {
  return [/Application ID/, /Client ID/];
}

describe("<CustodianIntegrationsForm />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getByLabelText(selector)).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Integrations" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        defaultProps.defaultValues
      );
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", { name: "Integrations" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
