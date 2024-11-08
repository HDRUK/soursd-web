import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import SourcdLogo from "./SourcdLogo";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("SourcdLogo", () => {
  it("renders the logo image", () => {
    const mockT = jest.fn().mockReturnValue("SOURCD");
    (useTranslations as jest.Mock).mockReturnValue(mockT);

    render(<SourcdLogo />);
    const image = screen.getByRole("img", { name: /SOURCD/i });
    expect(image).toBeInTheDocument();
  });

  it("renders the title with the correct translation", () => {
    const mockT = jest.fn().mockReturnValue("SOURCD");
    (useTranslations as jest.Mock).mockReturnValue(mockT);

    render(<SourcdLogo />);
    const title = screen.getByRole("heading", { name: /SOURCD/i });
    expect(title).toBeInTheDocument();
  });
});
