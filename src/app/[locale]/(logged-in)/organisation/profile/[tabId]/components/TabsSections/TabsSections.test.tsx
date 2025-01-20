import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useParams } from "@/i18n/routing";
import TabsSections from "./TabsSections";

jest.mock("@/i18n/routing", () => ({
  ...jest.requireActual("@/i18n/routing"),
  useParams: jest.fn(),
}));

(useParams as unknown as jest.Mock).mockReturnValue("");

const renderTabs = () => {
  return render(<TabsSections />);
};

describe("<TabsSections />", () => {
  it("shows default tab is selected", () => {
    renderTabs();

    expect(screen.getByRole("tab", { selected: true }).textContent).toEqual(
      "Profile"
    );
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTabs());
  });
});
