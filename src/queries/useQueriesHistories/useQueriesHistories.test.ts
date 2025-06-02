import { renderHook, waitFor } from "../../utils/testUtils";
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
            getAffiliations: null,
            getEducations: null,
            getTrainings: null,
            getUserApprovedProjects: null,
            getProfessionalRegistrations: null,
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
            getTrainings: expect.objectContaining({
              message: "success",
            }),
            getUserApprovedProjects: expect.objectContaining({
              message: "success",
            }),
            getProfessionalRegistrations: expect.objectContaining({
              message: "success",
            }),
          },
        })
      );
    });
  });
});
