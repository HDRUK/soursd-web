import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useParams } from "next/navigation";
import TabsSections from "./TabsSections";

jest.mock("next/navigation");

(useParams as unknown as jest.Mock).mockReturnValue("");

const renderTabs = () => {
  return render(<TabsSections />);
};

describe("<TabsSections />", () => {
  commonAccessibilityTests(renderTabs());

  it("shows default tab is selected", () => {
    renderTabs();

    expect(screen.getByRole("tab", { selected: true }).textContent).toEqual(
      "Profile"
    );
  });
});
