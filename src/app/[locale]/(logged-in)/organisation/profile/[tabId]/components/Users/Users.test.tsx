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
import Users from "./Users";

jest.mock("@/services/organisations");
jest.mock("@/data/store");
jest.mock("@/hooks/usePaginatedQuery");
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

describe("<User />", () => {
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

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<Users />));
  });
});