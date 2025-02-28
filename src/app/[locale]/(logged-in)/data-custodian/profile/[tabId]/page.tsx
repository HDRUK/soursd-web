import usePathServerSide from "@/hooks/usePathServerSide";
import { PageBodyContainer } from "@/modules";
import { anyIncludes } from "@/utils/string";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import TabsContents from "./components/TabsContents";
import { getSubTabs, PageTabs } from "./consts/tabs";

interface PageProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function Page({ params: { tabId } }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const path = usePathServerSide();
  const subTabs = getSubTabs(tabId) || [];

  if (!!subTabs?.length && !anyIncludes(path, subTabs)) {
    redirect(`${path}/${subTabs[0]}`);
  }

  return (
    <PageBodyContainer heading={t(tabId)}>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
