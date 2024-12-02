import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import TabsSections from "./TabsSections";

describe("<TabsSections />", () => {
  it.each([
    { name: "Profile", path: ROUTES.profileDataCustodianDetails.path },
    { name: "Users", path: ROUTES.profileDataCustodianUsers.path },
    {
      name: "Configuration",
      path: ROUTES.profileDataCustodianConfiguration.path,
    },
    { name: "Keycards", path: ROUTES.profileDataCustodianKeycards.path },
  ])("has the correct path $s", ({ name, path }) => {
    render(<TabsSections />);

    const tab = screen.getByRole("tab", {
      name,
    });

    expect(tab).toHaveAttribute("href", `/en${path}`);
  });
});
