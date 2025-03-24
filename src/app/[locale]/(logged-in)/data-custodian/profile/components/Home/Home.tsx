"use client";

import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelItem from "@/components/ActionsPanelItem";
import Postit from "@/components/Postit";
import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import { Custodian } from "@/types/application";
import { Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

export interface DetailsFormValues {
  name: string;
  contact_email: string;
}

export interface HomeProps {
  custodian: Custodian;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function Home({ custodian }: HomeProps) {
  const theme = useTheme();

  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageColumns>
      <PageColumnBody>
        <PageBody>
          <PageSection>
            <ActionsPanel
              description={
                <>
                  Welcome to Sourced! You’ll see a list of tasks below we’ve
                  assigned to you to complete your profile. To help you do that
                  as quickly as possible here’s a list of things you’ll need
                  before you dive in:
                  <ul>
                    <li>Prerequisite 1</li>
                    <li>Prerequisite 2</li>
                    <li>Prerequisite 3</li>
                  </ul>
                </>
              }>
              {actions.map(action => (
                <ActionsPanelItem {...action} />
              ))}
            </ActionsPanel>
          </PageSection>
        </PageBody>
      </PageColumnBody>
      <PageColumnDetails>
        <PageBody>
          <Postit>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {t("uniqueIdentifierTitle")}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h4.fontSize,
                fontWeight: 500,
                mb: 1,
              }}>
              {custodian.unique_identifier}
            </Typography>
            <Typography>{t("uniqueIdentifierCaption")}</Typography>
          </Postit>
        </PageBody>
      </PageColumnDetails>
    </PageColumns>
  );
}
