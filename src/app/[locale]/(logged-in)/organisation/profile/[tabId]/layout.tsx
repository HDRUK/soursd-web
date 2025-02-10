import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageSubTabs, PageTabs } from "./consts/tabs";

interface LayoutProps extends ConfigProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
    subTabId: PageSubTabs;
  };
}

function Layout({ children, params: { tabId }, config }: LayoutProps) {
  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileOrganisationDetailsNameAndAddress.path);
  }

  return (
    <>
      <TabsSections />
      <TabsContents tabId={tabId} />
      {children}
    </>
  );
}

export default withConfig(Layout);
