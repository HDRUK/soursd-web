"use client";

import { useStore } from "@/data/store";
import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import PageSection from "@/modules/PageSection";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export default function Users() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  const custodianId = useStore(state => state.getCustodian()?.id);

  return (
    <PageBodyContainer heading={tProfile("usersListTitle")}>
      <PageBody>
        <PageSection>
          <Typography variant="body1">
            {tProfile("usersListDescription")}
          </Typography>
        </PageSection>
        <ProjectUsersList custodianId={custodianId} />
      </PageBody>
    </PageBodyContainer>
  );
}
