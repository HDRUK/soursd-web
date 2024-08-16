import { renderHook, waitFor } from "@/utils/testUtils";
import useQueriesHistories from "./useQueriesHistories";

const setupUseQueryHistories = () => renderHook(() => useQueriesHistories(1));

describe("useQueryRefetch", () => {
  it("gets all history", async () => {
    const { result } = setupUseQueryHistories();

    await waitFor(() => {
      expect(result.current).toEqual(
        expect.objectContaining({
          isError: false,
          isLoading: false,
          error: {
            getAccreditations: null,
            getProjects: null,
            getEducations: null,
            getEmployments: null,
            getTrainings: null,
          },
          data: {
            getAccreditations: expect.objectContaining({
              message: "success",
            }),
            getProjects: expect.objectContaining({
              message: "success",
            }),
            getEducations: expect.objectContaining({
              message: "success",
            }),
            getEmployments: expect.objectContaining({
              message: "success",
            }),
            getTrainings: expect.objectContaining({
              message: "success",
            }),
          },
        })
      );
    });

    // await waitFor(() => {
    //   expect((result.current as CurrentRefetch).isLoading).toEqual(true);
    //   expect(mockRefetchQueries).toHaveBeenCalledWith(mockedOptions);
    // });
  });
});
