import { fireEvent, render, screen } from "@/utils/testUtils";
import { axe } from "jest-axe";
import { ActionMenu, ActionMenuItem } from ".";

const renderSections = () =>
  render(
    <ActionMenu aria-label="Actions menu">
      <ActionMenuItem>Permissions</ActionMenuItem>
    </ActionMenu>
  );

describe("<ActionMenu />", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderSections();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("displays the menu", async () => {
    renderSections();

    const menu = screen.getByLabelText("Actions menu");
    const menuTrigger = menu.childNodes[0];

    fireEvent.click(menuTrigger);

    return screen.getByText("Permissions");
  });
});
