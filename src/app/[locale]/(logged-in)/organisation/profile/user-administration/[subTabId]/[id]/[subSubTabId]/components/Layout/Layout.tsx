import { ConfigProps } from "@/components/Config";
import { ReactNode } from "react";
import { UserSubTabs } from "../../../../../../consts/tabs";
import SubTabSections from "../SubTabSections";

interface LayoutProps extends ConfigProps {
  children: ReactNode;
  params: {
    id: number;
    subSubTabId: UserSubTabs;
  };
}

function Layout({ children, params: { id, subSubTabId } }: LayoutProps) {
  return (
    <>
      <SubTabSections userId={id} subTabId={subSubTabId} />
      {children}
    </>
  );
}

export default Layout;
