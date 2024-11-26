import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedIssuer } from "@/mocks/data/issuer";
import { render, screen } from "@/utils/testUtils";
import { PageTabs } from "./consts/tabs";
import Page from "./page";

jest.mock("@/data/store");

const defaultIssuer = mockedIssuer();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultIssuer,
  null,
]);

const renderPageTab = (tabId: PageTabs) =>
  render(<Page params={{ tabId }} config={{ routes: ROUTES }} />);

describe("<Page />", () => {
  it.each([
    { tabId: PageTabs.DETAILS, name: "Profile" },
    { tabId: PageTabs.USERS, name: "Users" },
    { tabId: PageTabs.CONFIGURATION, name: "Configuration" },
    { tabId: PageTabs.KEYCARDS, name: "Keycards" },
  ])("has the correct content $s", ({ tabId, name }) => {
    renderPageTab(tabId);

    expect(
      screen.getByRole("heading", {
        name,
      })
    ).toBeInTheDocument();
  });
});
