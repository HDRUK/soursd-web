import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockedAffiliation } from "@/mocks/data/user";
import { useMutation } from "@tanstack/react-query";
import { mockPagedResults } from "jest.utils";
import Affiliations from "./Affiliations";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

describe("<Affiliations />", () => {
  const paginatedTestAffiliations = mockPagedResults([
    mockedAffiliation(),
    mockedAffiliation({
      organisation: {
        organisation_name: "Second Organisation Name",
      },
    }),
  ]);
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({
      config: {
        user: { registry_id: 123 },
        histories: { affiliations: paginatedTestAffiliations.data },
      },
      getHistories: jest.fn(),
      setHistories: jest.fn(),
    });

    mockUseMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useMutation>);
  });

  it("displays the affiliations table", async () => {
    render(
      <Affiliations
        setHistories={jest.fn()}
        getHistories={jest.fn()}
        affiliationsData={paginatedTestAffiliations.data}
        total={paginatedTestAffiliations.total}
        getAffiliationsQueryState={{ isLoading: false }}
      />
    );
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("displays organisation name in the table", async () => {
    render(
      <Affiliations
        setHistories={jest.fn()}
        getHistories={jest.fn()}
        affiliationsData={paginatedTestAffiliations.data}
        total={paginatedTestAffiliations.total}
        getAffiliationsQueryState={{ isLoading: false }}
      />
    );
    await waitFor(() => {
      expect(
        screen.getByText(
          paginatedTestAffiliations.data[0].organisation.organisation_name
        )
      ).toBeInTheDocument();
    });
  });

  it("displays 6 columns", async () => {
    render(
      <Affiliations
        setHistories={jest.fn()}
        getHistories={jest.fn()}
        affiliationsData={paginatedTestAffiliations.data}
        total={paginatedTestAffiliations.total}
        getAffiliationsQueryState={{ isLoading: false }}
      />
    );
    await waitFor(() => {
      expect(screen.getAllByRole("columnheader")).toHaveLength(6);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(
      render(
        <Affiliations
          setHistories={jest.fn()}
          getHistories={jest.fn()}
          affiliationsData={paginatedTestAffiliations.data}
          total={paginatedTestAffiliations.total}
          getAffiliationsQueryState={{ isLoading: false }}
        />
      )
    );
  });
});
