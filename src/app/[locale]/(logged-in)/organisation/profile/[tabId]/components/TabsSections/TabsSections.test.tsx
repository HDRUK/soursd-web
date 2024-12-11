import { act, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { useParams } from "next/navigation";
import TabsSections from "./TabsSections";

jest.mock("next/navigation");

(useParams as unknown as jest.Mock).mockReturnValue("");

const renderTabs = () => {
  return render(<TabsSections />);
};

describe("<TabsSections />", () => {
  it("has no accessibility validations", async () => {
    const { container } = renderTabs();

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it("shows default tab is selected", () => {
    renderTabs();

    expect(screen.getByRole("tab", { selected: true }).textContent).toEqual(
      "Profile"
    );
  });
});
