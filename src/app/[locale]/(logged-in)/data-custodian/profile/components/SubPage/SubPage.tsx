import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { ConfigurationSubTabs, PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: ConfigurationSubTabs | UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  if (params.tabId === PageTabs.USERS && !params.id) {
    notFound();
  }

  return (
    <PageBodyContainer heading={t(toCamelCase(params.tabId))}>
      <PageColumns>
        <PageColumnBody>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageColumnBody>
        <PageColumnDetails>Validation checks</PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default SubPage;
