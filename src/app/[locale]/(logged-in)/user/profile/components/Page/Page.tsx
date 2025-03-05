import { PageBodyContainer } from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";

interface PageProps {
  params: {
    tabId: PageTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

function Page({ params: { tabId } }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(tabId))}>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
