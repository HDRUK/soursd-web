import { renderHook, act } from "../../utils/testUtils";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return the value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current[0]).toBe("initial");

    act(() => {
      rerender({ value: "updated", delay: 500 });
      jest.advanceTimersByTime(250);
    });

    expect(result.current[0]).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe("updated");
  });
});
