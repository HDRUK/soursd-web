import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import TabsSections from "./TabsSections";

describe("<TabsSections />", () => {
  it.each([
    { name: "Profile", path: ROUTES.profileCustodianDetails.path },
    { name: "Users", path: ROUTES.profileCustodianUsers.path },
    {
      name: "Configuration",
      path: ROUTES.profileCustodianConfiguration.path,
    },
    { name: "Keycards", path: ROUTES.profileCustodianKeycards.path },
  ])("has the correct path $s", ({ name, path }) => {
    render(<TabsSections />);

    const tab = screen.getByRole("tab", {
      name,
    });

    expect(tab).toHaveAttribute("href", path);
  });
});
