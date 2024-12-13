import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedCustodian } from "@/mocks/data/custodian";
import { render, screen } from "@/utils/testUtils";
import { PageTabs } from "./consts/tabs";
import Page from "./page";

jest.mock("@/data/store");

jest.mock("next/navigation", () => ({
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
