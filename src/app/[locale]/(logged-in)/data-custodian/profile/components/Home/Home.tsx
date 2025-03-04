"use client";

import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelItem from "@/components/ActionsPanelItem";
import Postit from "@/components/Postit";
import { useStore } from "@/data/store";
import { Link } from "@/i18n/routing";
import {
  PageBody,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { Custodian } from "@/types/application";
import { Button, Typography, useTheme } from "@mui/material";
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

  const routes = useStore(state => state.getApplication().routes);

  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const actions = [
    {
      heading: "Complete your configuration",
      description:
        "This is where we need you to setup things lke IDV technology and the decision models...",
      action: (
        <Button
          component={Link}
          href={routes.profileCustodianConfiguration.path}>
          Get started
        </Button>
      ),
    },
    {
      heading: "Add your users",
      description:
        "As well as yourself, it’s a good idea to set up your colleagues who will help administer the system and approve users, projects and organisations",
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianUsers.path}>
          Add users
        </Button>
      ),
    },
    {
      heading: "Add your contacts",
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianContacts.path}>
          Add contacts
        </Button>
      ),
    },
    {
      heading: "Add your projects",
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianProjects.path}>
          Add projects
        </Button>
      ),
    },
    {
      heading: "Add organisations",
      action: (
        <Button
          component={Link}
          variant="outlined"
          href={routes.profileCustodianOrganisations.path}>
          Add organisations
        </Button>
      ),
    },
  ];

  return (
    <PageColumns>
      <PageColumnBody>
        <PageBody>
          <ActionsPanel
            description={
              <>
                Welcome to Sourced! You’ll see a list of tasks below we’ve
                assigned to you to complete your profile. To help you do that as
                quickly as possible here’s a list of things you’ll need before
                you dive in:
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
