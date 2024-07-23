"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import { useStore } from "@/data/store";

export default function TabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%", mb: 2 }}>
      <Tabs
        value={params?.tabId || PageTabs.DETAILS}
        aria-label="nav tabs example"
        role="navigation"
        indicatorColor="secondary"
        textColor="inherit">
        <Tab
          label="Details"
          href={routes.profileResearcherDetails.path}
          component={Link}
          value={PageTabs.DETAILS}
        />
        <Tab
          label={"Identity"}
          href={routes.profileResearcherIdentity.path}
          component={Link}
          value={PageTabs.IDENTITY}
          iconPosition="start"
        />
        <Tab
          label="Experience"
          href={routes.profileResearcherExperience.path}
          component={Link}
          value={PageTabs.EXPERIENCE}
        />
        <Tab
          label="Training"
          href={routes.profileResearcherTraining.path}
          component={Link}
          value={PageTabs.TRAINING}
        />
        <Tab
          label="Affiliations"
          href={routes.profileResearcherAffiliations.path}
          component={Link}
          value={PageTabs.AFFILIATIONS}
        />
      </Tabs>
    </Box>
  );
}
