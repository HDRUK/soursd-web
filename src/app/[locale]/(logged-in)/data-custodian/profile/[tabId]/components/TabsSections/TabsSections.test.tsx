import { ROUTES } from "@/consts/router";
import { render, screen } from "@/utils/testUtils";
import TabsSections from "./TabsSections";

describe("<TabsSections />", () => {
  it.each([
    { name: "Home", path: `/en${ROUTES.profileCustodianHome.path}` },
    { name: "Users", path: `/en${ROUTES.profileCustodianUsers.path}` },
    { name: "Contacts", path: `/en${ROUTES.profileCustodianContacts.path}` },
  ])("has the correct path $s", ({ name, path }) => {
    render(<TabsSections />);

    const tab = screen.getByRole("tab", {
      name,
    });

    expect(tab).toHaveAttribute("href", path);
  });
});
