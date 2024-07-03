import { act, renderHook, waitFor } from "@/utils/testUtils";
import useQueryRefetch, { UseQueryRefetchProps } from "./useQueryRefetch";

const mockRefetchQueries = jest.fn(() => Promise.resolve());
const mockCancelQueries = jest.fn(() => Promise.resolve());

interface CurrentRefetch {
  cancel: () => void;
  refetch: () => void;
  isLoading: boolean;
}

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQueryClient: () => ({
    refetchQueries: mockRefetchQueries,
    cancelQueries: mockCancelQueries,
  }),
}));

jest.useFakeTimers();

const mockedOptions = {
  queryKey: ["getQuery", "123"],
};

const setupUseRefetchQuery = (props?: Partial<UseQueryRefetchProps>) =>
  renderHook(() =>
    useQueryRefetch({
      delay: 1000,
      options: {
        ...mockedOptions,
        ...props?.options,
      },
      ...props,
    })
  );

describe("useQueryRefetch", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("refetches", async () => {
    const { result } = setupUseRefetchQuery();

    act(() => {
      (result.current as CurrentRefetch).refetch();
    });

    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect((result.current as CurrentRefetch).isLoading).toEqual(true);
      expect(mockRefetchQueries).toHaveBeenCalledWith(mockedOptions);
    });
  });

  it("cancels", async () => {
    const { result } = setupUseRefetchQuery();
    const current = result.current as CurrentRefetch;

    act(() => {
      current.refetch();
      current.cancel();
    });

    expect((result.current as CurrentRefetch).isLoading).toEqual(false);

    await waitFor(() => {
      expect(mockCancelQueries).toHaveBeenCalled();
    });
  });
});
