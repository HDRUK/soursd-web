import {
  render,
  screen,
  fireEvent,
  waitFor,
  commonAccessibilityTests,
} from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import { mockedCustodian } from "@/mocks/data/custodian";
import { getRandomString } from "@/utils/string";
import { mockUseStore } from "jest.setup";
import Integrations from "./Integrations";

const gatewayAppId = getRandomString(40);
const gatewayClientId = getRandomString(40);

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: (ns: string) => (key: string) => `${ns}.${key}`,
}));

describe("<Integrations />", () => {
  const mockMutateAsync = jest.fn().mockResolvedValue({ success: true });

  beforeEach(() => {
    mockUseStore({
      getCustodian: () =>
        mockedCustodian({
          id: 1,
          gateway_app_id: gatewayAppId,
          gateway_client_id: gatewayClientId,
        }),
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    jest.clearAllMocks();
  });

  it("renders the form with default values", () => {
    render(<Integrations />);

    expect(screen.getByDisplayValue(gatewayAppId)).toBeInTheDocument();
    expect(screen.getByDisplayValue(gatewayClientId)).toBeInTheDocument();
    expect(
      screen.getByAltText("CustodianProfile.dsitLogoAlt")
    ).toBeInTheDocument();
    expect(
      screen.getByText("CustodianProfile.integrationsDescription")
    ).toBeInTheDocument();
  });

  it("submits the form with updated values", async () => {
    render(<Integrations />);

    const appIdField = screen.getByPlaceholderText(
      "Form.gatewayAppIdPlaceholder"
    );
    const clientIdField = screen.getByPlaceholderText(
      "Form.gatewayClientIdPlaceholder"
    );

    const newAppId = getRandomString(40);
    const newClientId = getRandomString(40);

    fireEvent.change(appIdField, { target: { value: newAppId } });
    fireEvent.change(clientIdField, { target: { value: newClientId } });

    const submitButton = screen.getByRole("button", {
      name: "Profile.submitButton",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        gateway_app_id: newAppId,
        gateway_client_id: newClientId,
      });
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<Integrations />);

    const appIdField = screen.getByPlaceholderText(
      "Form.gatewayAppIdPlaceholder"
    );
    const clientIdField = screen.getByPlaceholderText(
      "Form.gatewayClientIdPlaceholder"
    );

    fireEvent.change(appIdField, { target: { value: "" } });
    fireEvent.change(clientIdField, { target: { value: "" } });

    const submitButton = screen.getByRole("button", {
      name: "Profile.submitButton",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getAllByText("Form.integrationIdFormatInvalid")
      ).toHaveLength(2);
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("shows validation errors for bad field", async () => {
    render(<Integrations />);

    const appIdField = screen.getByPlaceholderText(
      "Form.gatewayAppIdPlaceholder"
    );
    const clientIdField = screen.getByPlaceholderText(
      "Form.gatewayClientIdPlaceholder"
    );

    const newAppId = getRandomString(30);
    const newClientId = getRandomString(40);

    fireEvent.change(appIdField, { target: { value: newAppId } });
    fireEvent.change(clientIdField, { target: { value: newClientId } });

    const submitButton = screen.getByRole("button", {
      name: "Profile.submitButton",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getAllByText("Form.integrationIdFormatInvalid")
      ).toHaveLength(1);
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Integrations />));
  });
});
