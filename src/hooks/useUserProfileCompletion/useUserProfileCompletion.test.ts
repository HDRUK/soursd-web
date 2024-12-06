import { UserProfileCompletionCategories } from "@/consts/user";
import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { User } from "@/types/application";
import { act, renderHook, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { useMutation } from "@tanstack/react-query";
import useUserProfileCompletion from "./useUserProfileCompletion";

jest.mock("@/data/store");
jest.mock("@tanstack/react-query");

const mockSetUser = jest.fn();
const mockMutateAsync = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: "",
  profile_completed_at: null,
});

const defaultStepsCompleted =
  '{"identity":{"fields":[{"name":"first_name","required":true},{"name":"last_name","required":true},{"name":"dob","required":true}],"score":0},"affiliations":{"fields":[],"score":100},"experience":{"fields":[],"score":100},"training":{"fields":[],"score":100}}';

const mockedFormFields = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  dob: "",
};

(useStore as unknown as jest.Mock).mockReturnValue([
  {
    ...defaultUser,
    profile_steps_completed: defaultStepsCompleted,
  },
  mockSetUser,
]);
(useMutation as unknown as jest.Mock).mockReturnValue({
  mutateAsync: mockMutateAsync,
  isError: false,
  isPending: true,
  error: "",
});

interface UseUserProfileCompletion {
  update: <T>(
    formFields: T,
    category: UserProfileCompletionCategories,
    userData?: User
  ) => void;
}

const renderTest = () =>
  renderHook(() => useUserProfileCompletion()) as unknown as {
    result: { current: UseUserProfileCompletion };
  };

describe("useUserProfileCompletion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date("2024-01-01"));
  });

  it("updates the user payload", async () => {
    const { result } = renderTest();

    act(() => {
      result.current.update(
        mockedFormFields,
        UserProfileCompletionCategories.IDENTITY
      );
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenLastCalledWith({
        ...defaultUser,
        profile_completed_at: null,
        profile_steps_completed:
          '{"identity":{"fields":[{"name":"first_name","required":true,"hasValue":true},{"name":"last_name","required":true,"hasValue":true},{"name":"dob","required":true,"hasValue":false}],"score":67},"affiliations":{"fields":[],"score":100},"experience":{"fields":[],"score":100},"training":{"fields":[],"score":100}}',
      });
    });
  });

  it("updates the payload on load", async () => {
    renderTest();

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        ...defaultUser,
        profile_completed_at: null,
        profile_completed_at: "2024-01-01 12:00:00",
        profile_steps_completed:
          '{"identity":{"fields":[{"name":"first_name","required":true,"hasValue":true},{"name":"last_name","required":true,"hasValue":true}],"score":100},"affiliations":{"fields":[],"score":100},"experience":{"fields":[],"score":100},"training":{"fields":[],"score":100}}',
      });
    });
  });

  it("completes the user payload", async () => {
    const { result } = renderTest();

    act(() => {
      result.current.update(
        { ...mockedFormFields, dob: "1980-04-11" },
        UserProfileCompletionCategories.IDENTITY
      );
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenLastCalledWith({
        ...defaultUser,
        profile_completed_at: "2024-01-01 12:00:00",
        profile_steps_completed:
          '{"identity":{"fields":[{"name":"first_name","required":true,"hasValue":true},{"name":"last_name","required":true,"hasValue":true},{"name":"dob","required":true,"hasValue":true}],"score":100},"affiliations":{"fields":[],"score":100},"experience":{"fields":[],"score":100},"training":{"fields":[],"score":100}}',
      });
    });
  });
});
