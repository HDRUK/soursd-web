"use client";

import { Box, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import getOrganisationStats from "@/services/organisations/getOrganisationStats";
import { StyledBox } from "./OrganisationStats.styles";

interface OrganisationStatsProps {
  organisationId: number;
}

const NAMESPACE_TRANSLATIONS_STATS = "OrganisationStats";

export default function OrganisationStats({
  organisationId,
}: OrganisationStatsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_STATS);

  const { data: userCount } = useQuery({
    queryKey: ["getOrganisationStats", organisationId, "users"],
    queryFn: () =>
      getOrganisationStats(
        {
          error: { message: "getOrganisationStats" },
        },
        "users",
        organisationId
      ),
  });

  const { data: activeProjectsCount } = useQuery({
    queryKey: ["getOrganisationStats", organisationId, "projects/present"],
    queryFn: () =>
      getOrganisationStats(
        {
          error: { message: "getOrganisationStats" },
        },
        "projects/present",
        organisationId
      ),
  });

  const { data: pastProjectsCount } = useQuery({
    queryKey: ["getOrganisationStats", organisationId, "projects/past"],
    queryFn: () =>
      getOrganisationStats(
        {
          error: { message: "getOrganisationStats" },
        },
        "projects/past",
        organisationId
      ),
  });

  const { data: certificationsCount } = useQuery({
    queryKey: ["getOrganisationStats", organisationId, "certifications"],
    queryFn: () =>
      getOrganisationStats(
        {
          error: { message: "getOrganisationStats" },
        },
        "certifications",
        organisationId
      ),
  });

  return (
    <Box
      sx={{
        display: "flex",
        width: "full",
        justifyContent: "space-around",
        marginBottom: "20px",
      }}>
      <StyledBox>
        <PeopleAltOutlinedIcon fontSize="large" />
        <Typography variant="h6" fontWeight="bold">
          {userCount?.data ?? "-"}
        </Typography>
        <Typography variant="body2">{t("affiliatedUsers")}</Typography>
      </StyledBox>
      <StyledBox>
        <LibraryBooksOutlinedIcon fontSize="large" />
        <Typography variant="h6" fontWeight="bold">
          {activeProjectsCount?.data ?? "-"}
        </Typography>
        <Typography variant="body2">{t("activeProjects")}</Typography>
      </StyledBox>
      <StyledBox>
        <CollectionsBookmarkOutlinedIcon fontSize="large" />
        <Typography variant="h6" fontWeight="bold">
          {pastProjectsCount?.data ?? "-"}
        </Typography>
        <Typography variant="body2">{t("pastProjects")}</Typography>
      </StyledBox>
      <StyledBox>
        <LockOutlinedIcon fontSize="large" />
        <Typography variant="h6" fontWeight="bold">
          {certificationsCount?.data ?? "-"}
        </Typography>
        <Typography variant="body2">{t("dataSecurityCompliance")}</Typography>
      </StyledBox>
    </Box>
  );
}
