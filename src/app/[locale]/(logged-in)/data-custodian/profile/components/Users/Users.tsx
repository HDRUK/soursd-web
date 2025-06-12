"use client";

import PageBody from "@/modules/PageBody";
import PageBodyContainer from "@/modules/PageBodyContainer";
import PageSection from "@/modules/PageSection";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { EntityType } from "@/types/api";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROJECTS = "Projects";
const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECTS);
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <PageBodyContainer heading={t("users")}>
      <PageBody>
        <PageSection>
          <Box>
            <Typography variant="body1">
              {tProfile("userListDescription")}
            </Typography>
          </Box>
        </PageSection>
        <ProjectUsersList variant={EntityType.CUSTODIAN} />
      </PageBody>
    </PageBodyContainer>
  );
}
