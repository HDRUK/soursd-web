import { act, renderHook, waitFor } from "@/utils/testUtils";
import useUserProfile, { UseQueryRefetchProps } from "./useUserProfile";
import { useStore } from "@/data/store";
import {
  mockedAccreditation,
  mockedAffiliation,
  mockedEducation,
  mockedEmployment,
  mockedTraining,
  mockedUser,
} from "@/mocks/data/user";

const mockRefetchQueries = jest.fn(() => Promise.resolve());
const mockCancelQueries = jest.fn(() => Promise.resolve());

interface CurrentRefetch {
  cancel: () => void;
  refetch: () => void;
  isLoading: boolean;
}

jest.mock("@/data/store");

const setupUseUserProfile = () => renderHook(useUserProfile);

describe("useUserProfile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Is complete when all required data is defined", async () => {
    (useStore as unknown as jest.Mock).mockReturnValue([
      mockedUser(),
      {
        accreditations: [mockedAccreditation()],
        education: [mockedEducation()],
        affiliations: [mockedAffiliation()],
        employments: [mockedEmployment()],
        training: [mockedTraining()],
      },
    ]);

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
      (useStore as unknown as jest.Mock).mockReturnValue([
        mockedUser(),
        {
          accreditations: [mockedAccreditation()],
          education: [mockedEducation()],
          employments: [mockedEmployment()],
          [value]: [],
        },
      ]);

      const { result } = setupUseUserProfile();

      expect(result.current).toEqual(
        expect.objectContaining({
          experiencesScore: 67,
          isComplete: false,
        })
      );
    }
  );

  it.each(["affiliations", "training"])(
    "Is not complete when any affiliations or training are missing",
    async value => {
      (useStore as unknown as jest.Mock).mockReturnValue([
        mockedUser(),
        {
          accreditations: [mockedAccreditation()],
          education: [mockedEducation()],
          employments: [mockedEmployment()],
          affiliations: [mockedAffiliation()],
          training: [mockedTraining()],
          [value]: [],
        },
      ]);

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
