import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import TabsSections from "./TabsSections";

describe("<TabsSections />", () => {
  it.each([
    { name: "Profile", path: `/en${ROUTES.profileCustodianDetails.path}` },
    { name: "Users", path: `/en${ROUTES.profileCustodianUsers.path}` },
    {
      name: "Configuration",
      path: `/en${ROUTES.profileCustodianConfiguration.path}`,
    },
    { name: "Keycards", path: `/en${ROUTES.profileCustodianKeycards.path}` },
  ])("has the correct path $s", ({ name, path }) => {
    render(<TabsSections />);

    const tab = screen.getByRole("tab", {
      name,
    });

    expect(tab).toHaveAttribute("href", path);
  });
});
