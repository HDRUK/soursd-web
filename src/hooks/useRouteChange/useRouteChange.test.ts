import { renderHook } from "@testing-library/react";
import { waitFor } from "../../utils/testUtils";
import useRouteChange from "./useRouteChange";

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

jest.spyOn(document, "querySelectorAll").mockImplementation(
  () =>
    [
      {
        removeEventListener: mockRemoveEventListener,
        addEventListener: mockAddEventListener,
      },
    ] as unknown as NodeListOf<Element>
);

const setupUseRouteChange = () =>
  renderHook(() =>
    useRouteChange({
      canLeave: false,
      onBlocked: jest.fn(),
    })
  );

describe("useQueryRefetch", () => {
  it("adds the correct event listeners", async () => {
    setupUseRouteChange();

    await waitFor(() => {
      expect(mockAddEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    });
  });

  it("removes the correct event listeners", async () => {
    const { unmount } = setupUseRouteChange();

    unmount();

    await waitFor(() => {
      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    });
  });
});
