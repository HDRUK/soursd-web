import { useStore } from "@/data/store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";
import Delegates from "./Delegates";

jest.mock("@/data/store");

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/usePatchOrganisation");

const mockOrganisation = mockedOrganisation();
const mockUser = mockedUser();
const mockDelegates = [
  mockedUser({
    is_delegate: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    created_at: "2023-01-01T00:00:00Z",
  }),
  mockedUser({
    is_delegate: 1,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    created_at: "2023-02-01T00:00:00Z",
  }),
];

describe("<Delegates />", () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue([
      mockOrganisation,
      mockUser,
      jest.fn(),
    ]);

    (useQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: mockDelegates,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ success: true }),
      isPending: false,
    });

    (usePatchOrganisation as jest.Mock).mockReturnValue({
      isError: false,
      isPending: false,
      error: null,
      onSubmit: jest.fn(),
    });
  });

  it("displays delegate information correctly", async () => {
    render(<Delegates />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });
  });

  it("shows loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: true,
      data: null,
    });

    render(<Delegates />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isError: true,
      isLoading: false,
      data: null,
    });

    render(<Delegates />);
    expect(
      screen.getByText(
        content =>
          content.includes("Unable to get the list of delegates") &&
          content.includes("Please try again or contact us")
      )
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Delegates />));
  });
});
