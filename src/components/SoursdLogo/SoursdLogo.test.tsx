import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import SoursdLogo from "./SoursdLogo";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("SoursdLogo", () => {
  it("renders the logo image", () => {
    const mockT = jest.fn().mockReturnValue("Safe People Registry");
    (useTranslations as jest.Mock).mockReturnValue(mockT);

    render(<SoursdLogo />);
    const image = screen.getByRole("img", { name: /Safe People Registry/i });
    expect(image).toBeInTheDocument();
  });

  it("renders the title with the correct translation", () => {
    const mockT = jest.fn().mockReturnValue("Safe People Registry");
    (useTranslations as jest.Mock).mockReturnValue(mockT);

    render(<SoursdLogo variant="titled" />);
    const title = screen.getByText("Safe People Registry");
    expect(title).toBeInTheDocument();
  });
});
