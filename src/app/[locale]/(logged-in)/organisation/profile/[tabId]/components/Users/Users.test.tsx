import { useStore } from "@/data/store";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as showAlertModule from "@/utils/showAlert";
import { showAlert } from "@/utils/showAlert";
import userEvent from "@testing-library/user-event";
import Users from "./Users";

jest.mock("@/services/organisations");
jest.mock("@/data/store");
jest.mock("@/hooks/usePaginatedQuery");
jest.mock("@tanstack/react-query");
jest.mock("@/utils/showAlert");
jest.mock("@/i18n/routing", () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const defaultOrganisation = mockedOrganisation();
const mockUsers = [
  mockedUser({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    created_at: "2024-01-01T00:00:00Z",
  }),
  mockedUser({
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    created_at: "2024-01-02T00:00:00Z",
  }),
];

(useStore as unknown as jest.Mock).mockReturnValue(defaultOrganisation);

(usePaginatedQuery as jest.Mock).mockReturnValue({
  isError: false,
  isLoading: false,
  data: mockUsers,
  last_page: 2,
  page: 1,
  setPage: jest.fn(),
});
(useMutation as jest.Mock).mockReturnValue({
  mutateAsync: jest.fn(),
  isPending: false,
  error: null,
});
(useQueryClient as jest.Mock).mockReturnValue({
  refetchQueries: jest.fn(),
});

describe("<User />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has the correct content", async () => {
    render(<Users />);

    mockUsers.forEach(user => {
      expect(
        screen.getByText(`${user.first_name} ${user.last_name}`)
      ).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Invited on: 01/01/2024"));
    });
  });

  it("renders pagination correctly", async () => {
    render(<Users />);

    expect(await screen.findByText("Previous")).toBeInTheDocument();
    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(await screen.findByText("Next")).toBeInTheDocument();
  });

  it("calls handleRemoveUser when remove icon is clicked", async () => {
    const mockMutateAsync = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      error: null,
    });

    jest
      .spyOn(showAlertModule, "showAlert")
      .mockImplementation(() => Promise.resolve({ isConfirmed: true }));

    render(<Users />);

    const removeButtons = screen.getAllByLabelText("icon-button");
    await userEvent.click(removeButtons[0]);

    expect(showAlertModule.showAlert).toHaveBeenCalledWith(
      "warning",
      expect.objectContaining({
        text: "This is a permanent action and the user will be removed from your organisation. Proceed?",
      })
    );

    const { preConfirm } = (showAlert as jest.Mock).mock.calls[0][1];
    await preConfirm();

    expect(mockMutateAsync).toHaveBeenCalledWith({
      organisationId: defaultOrganisation.id,
      registryId: mockUsers[0].registry_id,
    });
  });

  it("shows success alert after successful user removal", async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      error: null,
    });

    render(<Users />);

    const removeButtons = screen.getAllByLabelText("icon-button");
    await userEvent.click(removeButtons[0]);

    const { preConfirm } = (showAlert as jest.Mock).mock.calls[0][1];
    await preConfirm();

    expect(showAlert).toHaveBeenCalledWith(
      "success",
      expect.objectContaining({
        text: "User removed successfully",
      })
    );
  });

  it("shows error alert after failed user removal", async () => {
    const mockMutateAsync = jest
      .fn()
      .mockRejectedValue(new Error("Failed to remove user"));
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      error: "Unable to delete this user. Please try again",
    });

    render(<Users />);

    const removeButtons = screen.getAllByLabelText("icon-button");
    await userEvent.click(removeButtons[0]);

    const { preConfirm } = (showAlert as jest.Mock).mock.calls[0][1];
    await preConfirm();

    expect(showAlert).toHaveBeenCalledWith(
      "error",
      expect.objectContaining({
        text: "Unable to delete this user. Please try again",
      })
    );
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Users />));
  });
});
