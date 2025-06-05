import {
  commonAccessibilityTests,
  render,
  screen,
} from "../../utils/testUtils";
import FormSection from "./FormSection";

const renderTest = () => render(<FormSection heading="This is a heading" />);

describe("<FormSection />", () => {
  it("Has the correct content", async () => {
    renderTest();

    expect(screen.getByText("This is a heading")).toBeInTheDocument("");
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTest());
  });
});
