"use client"

import { Box, Typography } from "@mui/material"
import { StyledBox } from "./OrganisationStats.styles"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslations } from "next-intl";
import getOrganisationStats from "@/services/organisations/getOrganisationStats";
import { useQuery } from "@tanstack/react-query";

interface OrganisationStatsProps {
  organisationId: number;
}

const NAMESPACE_TRANSLATIONS_STATS = "OrganisationStats";

function getCountValues(statType: string, orgId: number) {
    const {
      data
    } = useQuery({
      queryKey: ["getOrganisationStats", orgId, statType],
      queryFn: () =>
        getOrganisationStats({
          error: {
            message: "getOrganisationStats",
          },
        },
        statType,
        orgId),
    });
    return data;
};

export default function OrganisationStats({
 organisationId
}: OrganisationStatsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_STATS);
  const getValue = (type: string) => {
    const countObject = getCountValues(type, organisationId);
    return countObject ? countObject.data : '-';
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      width: 'full', 
      justifyContent: 'space-around',
      marginBottom: '20px'}}>
        <StyledBox>
          <PeopleAltOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">{getValue('users')}</Typography>
          <Typography variant="body2">{t("affiliatedUsers")}</Typography>
        </StyledBox>
        <StyledBox>
          <LibraryBooksOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">{getValue('projects/present')}</Typography>
          <Typography variant="body2">{t("activeProjects")}</Typography>
        </StyledBox>
        <StyledBox>
          <CollectionsBookmarkOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">{getValue('projects/past')}</Typography>
          <Typography variant="body2">{t("pastProjects")}</Typography>
        </StyledBox>
        <StyledBox>
          <LockOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">{getValue('certifications')}</Typography>
          <Typography variant="body2">{t("dataSecurityCompliance")}</Typography>
        </StyledBox>
    </Box>
  )
};
