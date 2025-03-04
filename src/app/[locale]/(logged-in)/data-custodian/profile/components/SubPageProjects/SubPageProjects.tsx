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
    tabId: PageTabs;
    subTabId: UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function SubPageProjects({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  if (params.tabId === PageTabs.PROJECTS && !params.id) {
    notFound();
  }

  return (
    <PageBodyContainer heading={t(toCamelCase(params.tabId))}>
      <PageColumns>
        <PageColumnBody>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageColumnBody>
        <PageColumnDetails>{mockedVerifications()}</PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
