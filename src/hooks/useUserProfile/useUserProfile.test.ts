import { renderHook } from "@/utils/testUtils";
import useUserProfile from "./useUserProfile";

const setupUseUserProfile = () => renderHook(useUserProfile);

describe("useUserProfile", () => {
  it("Is complete when all required data is defined", async () => {
    const { result } = setupUseUserProfile();

    expect(result.current).toEqual({
      affiliationsScore: 100,
      experiencesScore: 100,
      identityScore: 100,
      isComplete: true,
      trainingScore: 100,
    });
  });

  it.each(["education", "employments", "accreditations"])(
    "Is not complete when any experiences are missing",
    async value => {
      mockUseStore({
        config: {
          histories: {
            [value]: [],
          },
        },
      });

      const { result } = setupUseUserProfile();

      expect(result.current).toEqual({
        experiencesScore: 67,
        affiliationsScore: 100,
        identityScore: 100,
        trainingScore: 100,
        isComplete: false,
      });
    }
  );

  it.each(["training", "professionalRegistrations"])(
    "Is not complete when any trainings are missing",
    async value => {
      mockUseStore({
        config: {
          histories: {
            [value]: [],
          },
        },
      });

      const { result } = setupUseUserProfile();

      expect(result.current).toEqual({
        affiliationsScore: 100,
        experiencesScore: 100,
        identityScore: 100,
        trainingScore: 50,
        isComplete: false,
      });
    }
  );

  it.each(["affiliations"])(
    "Is not complete when any affiliations are missing",
    async value => {
      mockUseStore({
        config: {
          histories: {
            [value]: [],
          },
        },
      });

      const { result } = setupUseUserProfile();

      expect(result.current).toEqual({
        affiliationsScore: 100,
        experiencesScore: 100,
        identityScore: 100,
        isComplete: false,
        trainingScore: 100,
        [`${value}Score`]: 0,
      });
    }
  );
});
