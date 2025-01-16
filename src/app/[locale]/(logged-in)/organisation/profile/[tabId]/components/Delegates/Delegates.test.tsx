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
import usePatchOrganisation from "../../hooks/usePatchOrganisation";
import Delegates from "./Delegates";

jest.mock("@/data/store");
jest.mock("@/hooks/usePaginatedQuery");
jest.mock("../../hooks/usePatchOrganisation");

const mockOrganisation = mockedOrganisation();
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
    (useStore as unknown as jest.Mock).mockReturnValue({
      organisation: mockOrganisation,
      setOrganisation: jest.fn(),
    });

    (usePaginatedQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: mockDelegates,
      last_page: 1,
      page: 1,
      setPage: jest.fn(),
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
    (usePaginatedQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: true,
      data: null,
      last_page: 1,
      page: 1,
      setPage: jest.fn(),
    });

    render(<Delegates />);
    expect(screen.getByText("No Delegates Found")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (usePaginatedQuery as jest.Mock).mockReturnValue({
      isError: true,
      isLoading: false,
      data: null,
      last_page: 1,
      page: 1,
      setPage: jest.fn(),
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

  it("renders pagination when there are multiple pages", () => {
    (usePaginatedQuery as jest.Mock).mockReturnValue({
      isError: false,
      isLoading: false,
      data: mockDelegates,
      last_page: 2,
      page: 1,
      setPage: jest.fn(),
    });

    render(<Delegates />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  commonAccessibilityTests(render(<Delegates />));
});
