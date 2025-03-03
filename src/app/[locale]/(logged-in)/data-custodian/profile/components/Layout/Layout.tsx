import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "../TabsSections";

interface LayoutProps extends ConfigProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

function Layout({ children, params: { tabId }, config }: LayoutProps) {
  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileCustodianHome.path);
  }

  return (
    <>
      <TabsSections tabId={tabId} />
      {children}
    </>
  );
}

export default withConfig(Layout);
