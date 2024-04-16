import { renderHook } from "@/utils/testUtils";
import useFeature from "./useFeature";

describe("useFeature", () => {
  it("validates the current users role", async () => {
    const { result } = renderHook(() => useFeature("Footer"));

    expect(result.current).toEqual({
      isAllowed: false,
      path: "@/modules/Footer",
    });
  });
});
