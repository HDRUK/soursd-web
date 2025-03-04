import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelValidationChecks from "@/components/ActionsPanelValidationChecks";
import { RejectIcon, VerifyIcon } from "@/consts/icons";
import { Link } from "@/i18n/routing";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { toCamelCase } from "@/utils/string";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";
import { mockedVerifications } from "@/mocks/data/static";

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
        <PageColumnDetails>{mockedVerifications()}</PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default SubPageUsers;
