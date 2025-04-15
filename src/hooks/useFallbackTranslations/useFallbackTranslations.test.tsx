import { renderHook } from "@/utils/testUtils"; // or from '@testing-library/react-hooks'
import useFallbackTranslations from "./useFallbackTranslations";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

import { useTranslations } from "next-intl";

describe("useTranslatedTitle", () => {
  const mockT = {
    raw: jest.fn(),
    // @ts-ignore
    _: (...args) => args.join("."),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns translated string if available", () => {
    mockT.raw.mockImplementation(key => `someNamespace.translatedKey`);
    mockT._ = jest.fn(() => "Translated Value");

    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      if (key === "titleKey") return "Translated Value";
    });
    (useTranslations as jest.Mock).mockReturnValueOnce(
      Object.assign((key: string) => "Translated Value", mockT)
    );

    const { result } = renderHook(() =>
      useFallbackTranslations("someNamespace")
    );

    const translated = result.current("titleKey");

    expect(translated).toBe("Translated Value");
  });

  it("returns title-cased key if translation not available", () => {
    mockT.raw.mockImplementation(key => `someNamespace.${key}`);
    (useTranslations as jest.Mock).mockReturnValueOnce(
      Object.assign((key: string) => "", mockT)
    );

    const { result } = renderHook(() =>
      useFallbackTranslations("someNamespace")
    );

    const fallback = result.current("untranslated_key");

    expect(fallback).toBe("Untranslated Key");
  });
});
