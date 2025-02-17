import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import PageBodyContainer from "./PageBodyContainer";

const renderTest = () =>
  render(<PageBodyContainer heading="This is a heading" />);

describe("<PageBodyContainer />", () => {
  it("Has the correct content", async () => {
    renderTest();

    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("This is a heading");
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTest());
  });
});
