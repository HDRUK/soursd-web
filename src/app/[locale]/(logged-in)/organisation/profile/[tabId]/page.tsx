import { ConfigProps } from "@/components/Config";
import { ReactNode } from "react";
import { getSubTabs, PageTabs } from "./consts/tabs";
import { anyIncludes } from "@/utils/string";
import usePathServerSide from "@/hooks/usePathServerSide";
import { redirect } from "next/navigation";

interface PageProps extends ConfigProps {
  children: ReactNode;
  params: { tabId: PageTabs };
}

function Page({ children, params: { tabId } }: PageProps) {
  const path = usePathServerSide();
  const subTabs = getSubTabs(tabId) || [];

  if (!!subTabs?.length && !anyIncludes(path, subTabs)) {
    redirect(`${path}/${subTabs[0]}`);
  }

  return children;
}

export default Page;
