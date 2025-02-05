import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "next/navigation";
import usePathServerSide from "@/hooks/usePathServerSide";
import { PageTabs, getSubTabs } from "./consts/tabs";
import TabsContents from "./components/TabsContents";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId }, config }: PageProps) {
  const path = usePathServerSide();
  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileOrganisationDetailsNameAndAddress.path);
  }

  const subTabs = getSubTabs(tabId) || [];

  if (subTabs?.length > 0) {
    redirect(`${path}/${subTabs[0]}`);
  }

  return <TabsContents tabId={tabId} />;
}

export default withConfig(Page);
