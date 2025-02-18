import React from "react";
import { render, screen, fireEvent, waitFor } from "@/utils/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import { showAlert } from "@/utils/showAlert";
import {
  PostOrganisationInviteUserResponse,
  postOrganisationInviteUser,
} from "@/services/organisations";
import { ResponseJson } from "@/types/requests";
import InviteDelegateForm from "./InviteDelegateForm";

jest.mock("@/data/store");
jest.mock("@/utils/showAlert");
jest.mock("@/services/organisations");
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;
const mockShowAlert = showAlert as jest.MockedFunction<typeof showAlert>;
const mockPostOrganisationsInviteUser =
  postOrganisationInviteUser as jest.MockedFunction<
    typeof postOrganisationInviteUser
  >;

describe("DelegatesForm", () => {
  const queryClient = new QueryClient();
  const onSuccess = jest.fn();

  beforeEach(() => {
    mockUseStore.mockReturnValue({
      config: {
        organisation: {
          id: 1,
          departments: [
            { id: 1, name: "Department 1" },
            { id: 2, name: "Department 2" },
          ],
        },
      },
    });

    mockPostOrganisationsInviteUser.mockResolvedValue(
      {} as ResponseJson<PostOrganisationInviteUserResponse>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <InviteDelegateForm onSuccess={onSuccess} />
      </QueryClientProvider>
    );
  };

  it("renders the form fields", () => {
    renderComponent();

    expect(
      screen.getByRole("combobox", { name: /departmentNameAriaLabel/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /delegateFullName/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /delegateJobTitle/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /delegateEmail/i })
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    renderComponent();

    const selectElement = screen.getByLabelText("departmentNameAriaLabel");
    fireEvent.mouseDown(selectElement);

    const option = screen.getByRole("listbox");
    fireEvent.click(option);
    fireEvent.mouseDown(document.body);
    fireEvent.keyDown(selectElement, { key: "Tab", code: "Tab" });

    fireEvent.change(screen.getAllByLabelText(/delegateFullName/i)[1], {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getAllByLabelText(/delegateJobTitle/i)[1], {
      target: { value: "Manager" },
    });
    fireEvent.change(screen.getAllByLabelText(/delegateEmail/i)[1], {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(mockPostOrganisationsInviteUser).toHaveBeenCalledWith(
        undefined,
        {
          email: "john@example.com",
          department_id: 0,
          first_name: "John",
          last_name: "Doe",
          role: "Manager",
          user_group: "ORGANISATION",
          is_delegate: 1,
          identifier: "delegate_invite",
        },
        expect.any(Object)
      );
      expect(mockShowAlert).toHaveBeenCalledWith("success", expect.any(Object));
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("shows an error alert when form submission fails", async () => {
    mockPostOrganisationsInviteUser.mockRejectedValue(new Error("API Error"));
    renderComponent();

    const selectElement = screen.getByLabelText("departmentNameAriaLabel");
    fireEvent.mouseDown(selectElement);

    const option = screen.getByRole("listbox");
    fireEvent.click(option);
    fireEvent.mouseDown(document.body);
    fireEvent.keyDown(selectElement, { key: "Tab", code: "Tab" });

    fireEvent.change(screen.getAllByLabelText(/delegateFullName/i)[1], {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getAllByLabelText(/delegateJobTitle/i)[1], {
      target: { value: "Manager" },
    });
    fireEvent.change(screen.getAllByLabelText(/delegateEmail/i)[1], {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith("error", expect.any(Object));
      expect(onSuccess).not.toHaveBeenCalled();
    });
  });
});
