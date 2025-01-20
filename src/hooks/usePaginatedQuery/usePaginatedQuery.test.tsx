import { act, renderHook, waitFor } from "@/utils/testUtils";
import { getProjects } from "@/services/projects";
import { useRouter } from "@/i18n/routing";
import { ProjectsResponse } from "@/services/projects/types";
import usePaginatedQuery, { PaginatedQueryReturn } from "./usePaginatedQuery";

jest.mock("@/data/store");
jest.mock("@/i18n/routing");

const mockedPush = jest.fn();

type CurrentResult = PaginatedQueryReturn<ProjectsResponse>;

const renderTest = ({
  params,
}: {
  params: Record<string, string | number | undefined>;
}) =>
  renderHook(() =>
    usePaginatedQuery<ProjectsResponse>({
      queryKeyBase: [`getProjects`],
      defaultQueryParams: {
        ...params,
      },
      queryFn: queryParams =>
        getProjects(queryParams, {
          error: {
            message: `getProjects`,
          },
        }),
    })
  );

describe("usePaginatedQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
    });
  });

  const testCases = [{ perPage: 2 }, { perPage: 5 }];

  it.each(testCases)(
    "Returns $perPage results when perPage is $perPage",
    async ({ perPage }) => {
      const { result } = renderTest({ params: { perPage } });

      await waitFor(() => {
        const current = result.current as CurrentResult;
        expect(current.isSuccess).toBeTruthy();
      });

      const current = result.current as CurrentResult;
      expect(current.data).toHaveLength(perPage);
    }
  );

  it("Updates the page number using setPage", async () => {
    const { result } = renderTest({ params: { perPage: 5 } });

    act(() => {
      (result.current as CurrentResult).setPage(2);
    });

    await waitFor(() => {
      expect((result.current as CurrentResult).page).toBe(2);
    });

    act(() => {
      (result.current as CurrentResult).setPage(3);
    });

    await waitFor(() => {
      expect((result.current as CurrentResult).page).toBe(3);
    });
  });

  it("Updates queryParams using updateQueryParam", async () => {
    const { result } = renderTest({ params: { perPage: 5 } });

    act(() => {
      (result.current as CurrentResult).updateQueryParam("perPage", "2");
    });
    await waitFor(() => {
      expect((result.current as CurrentResult).data.length).toBe(2);
    });

    act(() => {
      (result.current as CurrentResult).updateQueryParam("sort", "name:asc");
    });

    await waitFor(() => {
      expect((result.current as CurrentResult).queryParams.sort).toBe(
        "name:asc"
      );
    });

    act(() => {
      (result.current as CurrentResult).updateQueryParam("filter", "active");
    });

    await waitFor(() => {
      expect((result.current as CurrentResult).queryParams.filter).toBe(
        "active"
      );
    });
  });
});
