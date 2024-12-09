import useDebounce from "@/hooks/useDebounce";
import { renderHook, act } from "@/utils/testUtils";

describe("useDebounce", () => {
    beforeAll(() => {
        jest.useFakeTimers(); // Mock timers for setTimeout and clearTimeout
    });

    afterAll(() => {
        jest.useRealTimers(); // Restore original timers after testing
    });

    it("should return the value after the delay", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "initial", delay: 500 } }
        );

        expect(result.current).toBe("initial");

        act(() => {
            rerender({ value: "updated", delay: 500 }); // Simulate a change in value after the delay
            jest.advanceTimersByTime(250); // Move the timers forward by 250ms
        });

        expect(result.current).toBe("initial"); // Debounce shouldn't have triggered yet

        act(() => {
            jest.advanceTimersByTime(500); // Move the timers forward by another 500ms now
        });

        expect(result.current).toBe("updated"); // Debounced value should update to 'updated'
    });
});
