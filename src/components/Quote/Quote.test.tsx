import { render, screen } from "@/utils/testUtils";
import Quote from "./Quote";

describe("<Quote />", () => {
  it("has the correct image", async () => {
    render(<Quote profileImage="/test.image.png" />);

    const image = screen.getByAltText("Profile");

    expect(image).toHaveAttribute("src", "/test.image.png");
  });
});
