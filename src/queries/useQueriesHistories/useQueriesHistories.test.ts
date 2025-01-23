import { renderHook, waitFor } from "@/utils/testUtils";
import useQueriesHistories from "./useQueriesHistories";

const setupUseQueryHistories = () =>
  renderHook(() => useQueriesHistories(1, true));

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
            getAffiliations: null,
            getEducations: null,
            getEmployments: null,
            getTrainings: null,
            getUserApprovedProjects: null,
          },
          data: {
            getAccreditations: expect.objectContaining({
              message: "success",
            }),
            getAffiliations: expect.objectContaining({
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
            getUserApprovedProjects: expect.objectContaining({
              message: "success",
            }),
          },
        })
      );
    });
  });
});
