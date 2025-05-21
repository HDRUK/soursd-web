import { renderHook } from "../../utils/testUtils";
import useFallbackTranslations from "./useFallbackTranslations";

describe("useTranslatedTitle", () => {
  it("returns translated string if available", () => {
    const { result } = renderHook(() =>
      useFallbackTranslations("ActionsPanelValidationCheck")
    );
    const translated = result.current("organisation_aligned_sde_network");
    expect(translated).toBe(
      "Is the Organisation aligned with the SDE network?"
    );
  });

  it("returns title-cased key if translation not available", () => {
    const { result } = renderHook(() =>
      useFallbackTranslations("ActionsPanelValidationCheck")
    );
    const translated = result.current("my_fake_title");
    expect(translated).toBe("My Fake Title");
  });
});
