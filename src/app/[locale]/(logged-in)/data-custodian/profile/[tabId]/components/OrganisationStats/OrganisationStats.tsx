"use client"

import { Box, Typography } from "@mui/material"
import { StyledBox } from "./OrganisationStats.styles"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslations } from "next-intl";

interface OrganisationStatsProps {
}

const NAMESPACE_TRANSLATIONS_STATS = "OrganisationStats";

export default function OrganisationStats({
 
}: OrganisationStatsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_STATS);

  return (
    <Box sx={{ 
      display: 'flex', 
      width: 'full', 
      justifyContent: 'space-around',
      marginBottom: '20px'}}>
        <StyledBox>
          <PeopleAltOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">232</Typography>
          <Typography variant="body2">{t("affiliatedUsers")}</Typography>
        </StyledBox>
        <StyledBox>
          <LibraryBooksOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">232</Typography>
          <Typography variant="body2">{t("activeProjects")}</Typography>
        </StyledBox>
        <StyledBox>
          <CollectionsBookmarkOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">232</Typography>
          <Typography variant="body2">{t("pastProjects")}</Typography>
        </StyledBox>
        <StyledBox>
          <LockOutlinedIcon fontSize="large"/>
          <Typography variant="h6" fontWeight="bold">232</Typography>
          <Typography variant="body2">{t("dataSecurityCompliance")}</Typography>
        </StyledBox>
    </Box>
  )
};
