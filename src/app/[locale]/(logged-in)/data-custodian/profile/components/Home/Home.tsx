"use client";

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
import ActionLogs from "@/modules/ActionLogs";
import SoursdCard from "@/components/SoursdCard";

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
      <PageColumnBody lg={8}>
        <PageBody>
          <PageSection>
            <ActionLogs
              variant="custodian"
              panelProps={{
                heading: "Before you get started (5)",
                description: (
                  <>
                    Welcome to Sourced! You’ll see a list of tasks below we’ve
                    assigned to you to complete your profile. To help you do
                    that as quickly as possible here’s a list of things you’ll
                    need before you dive in:
                    <ul>
                      <li>Prerequisite 1</li>
                      <li>Prerequisite 2</li>
                      <li>Prerequisite 3</li>
                    </ul>
                  </>
                ),
              }}
            />
          </PageSection>
        </PageBody>
      </PageColumnBody>
      <PageColumnDetails lg={4}>
        <SoursdCard
          name={custodian.name}
          status={custodian.model_state?.state.slug}
          identifier={custodian.unique_identifier}>
          {t("uniqueIdentifierCaption")}
        </SoursdCard>
      </PageColumnDetails>
    </PageColumns>
  );
}
