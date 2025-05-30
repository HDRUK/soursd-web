import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import SectionHeading from "./SectionHeading";

const renderTest = () =>
  render(
    <SectionHeading
      heading="This is a heading"
      description="This is a description"
      variant="h1"
    />
  );

describe("<SectionHeading />", () => {
  it("Has the correct content", async () => {
    renderTest();

    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("This is a heading");

    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTest());
  });
});
