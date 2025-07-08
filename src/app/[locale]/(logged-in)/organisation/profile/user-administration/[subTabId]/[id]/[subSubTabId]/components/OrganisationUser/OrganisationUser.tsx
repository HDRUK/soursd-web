"use client";

import {
  PageColumnDetails,
  PageBodyContainer,
  PageColumnBody,
  PageColumns,
} from "@/modules";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
// import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import UserDetails from "@/components/UserDetails";
import { getUserQuery } from "@/services/users";
// import ActionValidationPanel from "@/modules/ActionValidationPanel";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import ConfirmAffiliation from "@/organisms/ConfirmAffiliation";
import { getOrganisationAffiliationQuery } from "@/services/affiliations";
import ActionsPanel from "@/components/ActionsPanel";
import ChipStatus from "@/components/ChipStatus";
import { Typography } from "@mui/material";
import { UserSubTabs } from "../../../../../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface OrganisationUserProps {
  userId: number;
  subSubTabId: UserSubTabs;
}

const NAMESPACE_TRANSLATION_ORGANISATION_PROFILE = "ProfileOrganisation";

function OrganisationUser({ userId, subSubTabId }: OrganisationUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ORGANISATION_PROFILE);

  const { data: userData, isFetched } = useQuery(getUserQuery(+userId));

  if (userData?.data.user_group !== UserGroup.USERS && isFetched) {
    notFound();
  }

  // Commented out for now as the correct query is not available yet
  // const { registry_id: registryId } = userData?.data || {};

  // const { data: validationLogs, ...queryState } = useQuery({
  //   ...getCustodianProjectUserValidationLogsQuery(
  //     custodian?.id as number,
  //     // projectId,
  //     registryId as number
  //   ),
  //   enabled: !!registryId,
  // });

  const [user, setUser, organisation] = useStore(state => [
    state.getCurrentUser(),
    state.setCurrentUser,
    state.getOrganisation(),
  ]);

  useEffect(() => {
    if (userData?.data) setUser(userData?.data);
  }, [userData]);

  const { data: affiliationData } = useQuery(
    getOrganisationAffiliationQuery(
      user?.registry_id as number,
      organisation?.id as number
    )
  );

  const affiliation = affiliationData?.data;

  return (
    user && (
      <PageBodyContainer heading={t("user")}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <UserDetails user={user} organisation={organisation} />
            <SubTabsSections userId={userId} subTabId={subSubTabId} />
            <SubTabsContents subTabId={subSubTabId} />
          </PageColumnBody>

          <PageColumnDetails lg={4}>
            <ActionsPanel
              panelSx={{ backgroundColor: "neutralGrey.main", mb: 2 }}>
              <Typography variant="h6">
                {t("affiliationStatus")}
                :
                <ChipStatus
                  sx={{ mx: 1 }}
                  status={affiliation?.model_state.state.slug}
                />
              </Typography>
            </ActionsPanel>
            {affiliation && <ConfirmAffiliation affiliation={affiliation} />}
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}

export default OrganisationUser;
