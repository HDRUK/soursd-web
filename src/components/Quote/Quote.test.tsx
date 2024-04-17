import { render, screen } from "@/utils/testUtils";
import Quote, { QuoteProps } from "./Quote";

const renderTest = (props?: Partial<QuoteProps>) =>
  render(<Quote name="Researcher" description="NHS Scotland" {...props} />);

describe("<Quote />", () => {
  it("has the correct default image", async () => {
    renderTest();

    const image = screen.getByAltText("Profile");

    expect(image).toHaveAttribute("src", "/profile.picture.png");
  });

  it("has the correct image", async () => {
    renderTest({ profileImage: "/test.image.png" });

    const image = screen.getByAltText("Profile");

    expect(image).toHaveAttribute("src", "/test.image.png");
  });
});
