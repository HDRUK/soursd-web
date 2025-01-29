"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, Link } from "@/i18n/routing";
import { PageTabs, PageSubTabs } from "../../../consts/tabs";

import { styled } from "@mui/material/styles";

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "12px 12px 0 0",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  "&.Mui-selected": {
    backgroundColor: "#2C5282",
    color: "#fff",
    borderBottom: "2px solid #5A67D8",
  },
  marginRight: theme.spacing(1),
}));

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function SubTabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  // to implement further...
  if (params?.tabId === PageTabs.DETAILS) {
    return (
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", width: "100%", my: 2 }}>
        <Tabs value={params?.subTabId || PageSubTabs.NAME_AND_ADDRESS}>
          <CustomTab
            label={t("detailsNameAndAddress")}
            href={routes.profileOrganisationDetailsNameAndAddress.path}
            component={Link}
            value={PageSubTabs.NAME_AND_ADDRESS}
            iconPosition="start"
          />
          <CustomTab
            label={t("detailsDigitalIdentifiers")}
            href={routes.profileOrganisationDetailsDigitalIdentifiers.path}
            component={Link}
            value={PageSubTabs.DIGITAL_IDENTIFIERS}
          />
          <CustomTab
            label={t("detailsSectorSiteAndWebsite")}
            href={routes.profileOrganisationDetailsSectorSiteAndWebsite.path}
            component={Link}
            value={PageSubTabs.SECTOR_SITE_AND_WEBSITE}
          />
          <CustomTab
            label={t("detailsSubsidiaries")}
            href={routes.profileOrganisationDetailsSubsidiaries.path}
            component={Link}
            value={PageSubTabs.SUBSIDIARIES}
          />
          <CustomTab
            label={t("detailsSecurityCompliance")}
            href={routes.profileOrganisationDetailsSecurityCompliance.path}
            component={Link}
            value={PageSubTabs.SECURITY_COMPLIANCE}
          />
        </Tabs>
      </Box>
    );
  }
  return;
}
