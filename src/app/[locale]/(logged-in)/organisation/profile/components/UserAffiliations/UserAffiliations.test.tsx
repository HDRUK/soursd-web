import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockedAffiliation } from "@/mocks/data/user";
import { useQuery } from "@tanstack/react-query";
import UserAffiliations from "./UserAffiliations";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

describe("<UserAffiliations />", () => {
  const testAffiliation = mockedAffiliation();
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({
      config: {
        user: { id: 123 },
        histories: { affiliations: [testAffiliation] },
      },
      current: {
        user: { registry_id: 123 },
      },
      getHistories: jest.fn(),
      setHistories: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: { data: { data: [testAffiliation] } },
      refetch: jest.fn(),
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useQuery>);
  });

  it("displays the affiliations table", async () => {
    render(<UserAffiliations />);
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("displays organisation name in the table", async () => {
    render(<UserAffiliations />);
    await waitFor(() => {
      expect(
        screen.getByText(testAffiliation.organisation.organisation_name)
      ).toBeInTheDocument();
    });
  });

  it("displays 6 columns", async () => {
    render(<UserAffiliations />);
    await waitFor(() => {
      expect(screen.getAllByRole("columnheader")).toHaveLength(6);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<UserAffiliations />));
  });
});
