"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import PageSection from "@/modules/PageSection";
import ProjectUsers from "@/organisms/ProjectUsers";
import { EntityType } from "@/types/api";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export default function Users() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const { custodianId, nameRoute } = useStore(state => ({
    custodianId: state.getCustodian()?.id,
    nameRoute: state.getApplication().routes.profileCustodianUsersIdentity,
  }));

  return (
    <PageBodyContainer heading={tProfile("usersListTitle")}>
      <PageBody>
        <PageSection>
          <Typography variant="body1">
            {tProfile("usersListDescription")}
          </Typography>
        </PageSection>
        <ProjectUsers
          variant={EntityType.CUSTODIAN}
          custodianId={custodianId}
          routes={{
            name: nameRoute,
          }}
        />
      </PageBody>
    </PageBodyContainer>
  );
}
