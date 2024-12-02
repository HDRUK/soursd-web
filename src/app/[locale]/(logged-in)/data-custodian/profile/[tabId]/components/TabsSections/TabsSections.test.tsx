import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import TabsSections from "./TabsSections";

describe("<TabsSections />", () => {
  it.each([
    { name: "Profile", path: ROUTES.profileIssuerDetails.path },
    { name: "Users", path: ROUTES.profileIssuerUsers.path },
    { name: "Configuration", path: ROUTES.profileIssuerConfiguration.path },
    { name: "Keycards", path: ROUTES.profileIssuerKeycards.path },
  ])("has the correct path $s", ({ name, path }) => {
    render(<TabsSections />);

    const tab = screen.getByRole("tab", {
      name,
    });

    expect(tab).toHaveAttribute("href", `/en${path}`);
  });
});
