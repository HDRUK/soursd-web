import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import { ActionMenu, ActionMenuItem } from ".";

const renderSections = () =>
  render(
    <ActionMenu aria-label="Actions menu">
      <ActionMenuItem>Permissions</ActionMenuItem>
    </ActionMenu>
  );

describe("<ActionMenu />", () => {
  it("displays the menu", async () => {
    renderSections();

    const menu = screen.getByLabelText("Actions menu");
    const menuTrigger = menu.childNodes[0];

    fireEvent.click(menuTrigger);

    return screen.getByText("Permissions");
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderSections());
  });
});
