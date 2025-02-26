import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import SoursdLogo from "./SoursdLogo";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("SoursdLogo", () => {
  it("renders the logo image", () => {
    const mockT = jest.fn().mockReturnValue("SOURSD");
    (useTranslations as jest.Mock).mockReturnValue(mockT);

    render(<SoursdLogo />);
    const image = screen.getByRole("img", { name: /SOURSD/i });
    expect(image).toBeInTheDocument();
  });

  it("renders the title with the correct translation", () => {
    const mockT = jest.fn().mockReturnValue("SOURSD");
    (useTranslations as jest.Mock).mockReturnValue(mockT);

    render(<SoursdLogo variant="titled" />);
    const title = screen.getByRole("heading", { name: /SOURSD/i });
    expect(title).toBeInTheDocument();
  });
});
