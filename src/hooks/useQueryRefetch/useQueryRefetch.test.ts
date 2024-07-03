import { act, renderHook, waitFor } from "@/utils/testUtils";
import { faker } from "@faker-js/faker";
import useQueryRefetch, { UseQueryRefetchProps } from "./useQueryRefetch";

const mockRefetchQueries = jest.fn(() => Promise.resolve());
const mockOnComplete = jest.fn();

interface CurrentRefetch {
  refetch: () => void;
  isLoading: boolean;
}

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQueryClient: () => ({
    refetchQueries: mockRefetchQueries,
  }),
}));

jest.useFakeTimers();
// jest.spyOn(global, "setTimeout");

const mockedOptions = {
  queryKey: ["getQuery", "123"],
};

const mockedValue = faker.string.sample();

const setupUseRefetchQuery = (props?: Partial<UseQueryRefetchProps<string>>) =>
  renderHook(() =>
    useQueryRefetch(
      {
        delay: 1000,
        cancel: () => false,
        onComplete: mockOnComplete,
        options: {
          ...mockedOptions,
          ...props?.options,
        },
        ...props,
      },
      mockedValue
    )
  );

describe("useQueryRefetch", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("refetches", async () => {
    const {
      result: { current },
    } = setupUseRefetchQuery();

    act(() => {
      (current as CurrentRefetch).refetch();
    });

    jest.runAllTimers();

    await Promise.resolve();

    jest.runAllTimers();

    await waitFor(() => {
      expect((current as CurrentRefetch).isLoading).toEqual(true);
      expect(mockRefetchQueries).toHaveBeenCalledTimes(2);
      expect(mockRefetchQueries).toHaveBeenCalledWith(mockedOptions);
    });
  });

  it("doesnt fetch", async () => {
    const {
      result: { current },
    } = setupUseRefetchQuery({
      cancel: (value: string) => value === mockedValue,
    });

    act(() => {
      (current as CurrentRefetch).refetch();
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockRefetchQueries).toHaveBeenCalledTimes(0);
    });
  });
});
