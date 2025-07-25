import { PageBody, PageGuidance, PageBodyContainer } from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import {
  DetailsPageSubTabs,
  PageTabs,
  UserAdminPageSubTabs,
} from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: DetailsPageSubTabs | UserAdminPageSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(`${params.tabId}Title`))}>
      <PageGuidance profile="organisation" {...params}>
        <PageBody>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}

export default SubPage;
