import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedCustodian } from "@/mocks/data/custodian";
import { render, screen } from "@/utils/testUtils";
import { PageTabs } from "./consts/tabs";
import Page from "./page";

jest.mock("@/data/store");

jest.mock("@/i18n/routing", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const defaultCustodian = mockedCustodian();

(useStore as unknown as jest.Mock).mockImplementation(() => [
  () => defaultCustodian,
  null,
]);

const renderPageTab = (tabId: PageTabs) =>
  render(<Page params={{ tabId }} config={{ routes: ROUTES }} />);

describe("<Page />", () => {
  it.each([
    { tabId: PageTabs.HOME, name: "Home" },
    { tabId: PageTabs.USERS, name: "Users" },
    { tabId: PageTabs.CONFIGURATION, name: "Configurations" },
    { tabId: PageTabs.CONTACTS, name: "Contacts" },
  ])("has the correct content $s", ({ tabId, name }) => {
    renderPageTab(tabId);

    expect(
      screen.getByRole("heading", {
        name,
      })
    ).toBeInTheDocument();
  });
});
