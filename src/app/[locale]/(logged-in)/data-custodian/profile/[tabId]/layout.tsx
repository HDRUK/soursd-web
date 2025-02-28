import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import TabsSections from "./components/TabsSections";
import { ConfigurationSubTabs, PageTabs } from "./consts/tabs";

interface LayoutProps extends ConfigProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
    subTabId: ConfigurationSubTabs;
  };
}

function Layout({ children, params: { tabId }, config }: LayoutProps) {
  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileCustodianHome.path);
  }

  return (
    <>
      <TabsSections />
      {children}
    </>
  );
}

export default withConfig(Layout);
