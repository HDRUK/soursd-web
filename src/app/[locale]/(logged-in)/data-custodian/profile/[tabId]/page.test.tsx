import { render } from "@/utils/testUtils";
import usePathServerSide from "@/hooks/usePathServerSide";
import { anyIncludes } from "@/utils/string";
import { redirect } from "next/navigation";
import Page from "./page";
import { PageTabs, getSubTabs } from "./consts/tabs";

jest.mock("./consts/tabs", () => ({
  getSubTabs: jest.fn(),
  PageTabs: {
    HOME: "home",
    USERS: "users",
    CONFIGURATION: "configuration",
    CONTACTS: "contacts",
  },
}));

jest.mock("@/utils/string", () => ({
  anyIncludes: jest.fn(),
}));

const mockPath = "/some/path/subtab2";
const mockSubTabs = ["subtab1", "subtab2"];
describe("<Page />", () => {
  const mockChildren = <div>Test Children</div>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects when a subtab", () => {
    (usePathServerSide as jest.Mock).mockReturnValue(mockPath);
    (getSubTabs as jest.Mock).mockReturnValue(mockSubTabs);
    (anyIncludes as jest.Mock).mockReturnValue(false);

    render(
      <Page params={{ tabId: PageTabs.CONFIGURATION }}>{mockChildren}</Page>
    );

    expect(redirect).toHaveBeenCalledWith(`${mockPath}/${mockSubTabs[0]}`);
  });
});
