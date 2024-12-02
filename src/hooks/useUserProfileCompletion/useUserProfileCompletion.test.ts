import { UserProfileCompletionCategories } from "@/consts/user";
import { useStore } from "@/data/store";
import { mockedUser } from "@/mocks/data/user";
import { User } from "@/types/application";
import { act, renderHook, waitFor, screen } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import { useMutation } from "@tanstack/react-query";
import useUserProfileCompletion from "./useUserProfileCompletion";

jest.mock("@/data/store");
jest.mock("@tanstack/react-query");

const mockSetUser = jest.fn();
const mockMutateAsync = jest.fn();

const defaultUser = mockedUser({
  profile_steps_completed: `{"identity":{"dob":false,"score":67,"last_name":true,"first_name":true}}`,
  profile_completed_at: null,
});

const mockedFormFields = {
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  dob: "",
};

(useStore as unknown as jest.Mock).mockReturnValue([defaultUser, mockSetUser]);
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
    mockMutateAsync.mockReset();

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
      expect(mockMutateAsync).toHaveBeenCalledWith(defaultUser);
    });
  });

  it("updates the score when a field is changed", async () => {
    const { result } = renderTest();

    act(() => {
      result.current.update(
        { ...mockedFormFields, last_name: "" },
        UserProfileCompletionCategories.IDENTITY
      );
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        ...defaultUser,
        profile_steps_completed: `{"identity":{"dob":false,"score":33,"last_name":false,"first_name":true}}`,
      });
    });
  });

  it("show an alert when the profile is completed", async () => {
    const { result } = renderTest();

    act(() => {
      result.current.update(
        { ...mockedFormFields, dob: "2000-01-01" },
        UserProfileCompletionCategories.IDENTITY
      );
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        ...defaultUser,
        profile_steps_completed: `{"identity":{"dob":true,"score":100,"last_name":true,"first_name":true}}`,
        profile_completed_at: "2024-01-01T00:00:00.000Z",
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("Your profile has been completed")
      ).toBeInTheDocument();
    });
  });
});
