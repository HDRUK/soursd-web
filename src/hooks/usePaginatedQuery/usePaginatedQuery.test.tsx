import { act, renderHook, waitFor } from "@/utils/testUtils";
import usePaginatedQuery from "./usePaginatedQuery";
import { SearchDirections } from "@/consts/search";
import { getProjects } from "@/services/projects";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

jest.mock("@/data/store");
jest.mock("@tanstack/react-query");

jest.mock("next/navigation");

const mockUseRouter = useRouter as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const renderTest = () =>
  renderHook(() =>
    usePaginatedQuery({
      queryKeyBase: [`getProjects`],
      defaultQueryParams: {
        sort: `title:${SearchDirections.ASC}`,
      },
      queryFn: () =>
        getProjects({
          error: {
            message: `getProjects`,
          },
        }),
    })
  );

describe("usePaginatedQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates the user payload", async () => {
    const { result } = renderTest();

    act(() => {});
  });
});
