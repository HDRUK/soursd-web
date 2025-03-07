import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import ProjectUserValidation from "../ProjectUserValidation";
import { PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    subTabId: UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPageUsers({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tabId = PageTabs.USERS;

  return (
    <PageBodyContainer heading={t(toCamelCase(tabId))}>
      <PageColumns>
        <PageColumnBody>
          <SubTabsSections tabId={tabId} {...params} />
          <SubTabsContents tabId={tabId} {...params} />
        </PageColumnBody>
        <PageColumnDetails>
          <ProjectUserValidation userId={params?.id as number} />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default SubPageUsers;
