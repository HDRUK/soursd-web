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

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPageUsers({ params }: PageProps) {
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
        <PageColumnDetails>
          <ActionsPanel heading="Validation checks">
            <ActionsPanelValidationChecks
              heading="Has all Network mandatory training and awareness been completed"
              history={[
                {
                  heading: "Mike Doe (custodian), 2 days ago",
                  description: "Here is that attachment",
                  actions: <Link href="#">Attachment</Link>,
                },
                {
                  heading: "Patrick Nash (User), 3 days ago",
                  description: "Detail of the comment here",
                  actions: <Link href="#">Attachment</Link>,
                },
                {
                  heading: "Patrick Nash (User), 3 days ago",
                  description: "Detail of the comment here",
                  actions: <Link href="#">Attachment</Link>,
                },
              ]}
              actions={
                <>
                  <Button
                    variant="outlined"
                    startIcon={<VerifyIcon fill="inherit" color="inherit" />}>
                    Pass
                  </Button>
                  <Button variant="outlined" startIcon={<RejectIcon />}>
                    Fail
                  </Button>
                  <Button variant="outlined">&#8230;</Button>
                </>
              }
            />
          </ActionsPanel>
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default SubPageUsers;
