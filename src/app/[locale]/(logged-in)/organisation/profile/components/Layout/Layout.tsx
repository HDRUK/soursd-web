import { ConfigProps } from "@/components/Config";
import { ReactNode } from "react";
import { PageTabs } from "../../consts/tabs";
import TabsSections from "../TabsSections";

interface LayoutProps extends ConfigProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

function Layout({ children, params: { tabId } }: LayoutProps) {
  return (
    <>
      <TabsSections tabId={tabId} />
      {children}
    </>
  );
}

export default Layout;
