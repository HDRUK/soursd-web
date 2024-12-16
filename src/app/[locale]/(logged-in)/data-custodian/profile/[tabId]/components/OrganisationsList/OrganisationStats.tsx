"use client";

import { TypographyProps } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTranslations } from "next-intl";
import StatsBox from "@/components/StatsBox";
import useOrganisationStats from "@/queries/useOrganisationStats";
import { StyledBox } from "./OrganisationStats.styles";

interface OrganisationStatsProps {
  organisationId: number;
}

const NAMESPACE_TRANSLATIONS_STATS = "OrganisationStats";

export default function OrganisationStats({
  organisationId,
}: OrganisationStatsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_STATS);

  const statBoxProps = {
    elevation: 6,
    valueProps: { justifySelf: "center" },
    descriptionProps: { variant: "body2" as TypographyProps["variant"] },
  };

  const { data } = useOrganisationStats(organisationId);

  const {
    getUsersStat,
    getActiveProjectsStat,
    getPastProjectsStat,
    getCertificationsStat,
  } = data;

  return (
    <StyledBox>
      <StatsBox
        icon={<PeopleAltOutlinedIcon fontSize="large" />}
        value={getUsersStat?.data ?? "-"}
        description={t("affiliatedUsers")}
        {...statBoxProps}
      />
      <StatsBox
        icon={<LibraryBooksOutlinedIcon fontSize="large" />}
        value={getActiveProjectsStat?.data ?? "-"}
        description={t("activeProjects")}
        {...statBoxProps}
      />
      <StatsBox
        icon={<CollectionsBookmarkOutlinedIcon fontSize="large" />}
        value={getPastProjectsStat?.data ?? "-"}
        description={t("pastProjects")}
        {...statBoxProps}
      />
      <StatsBox
        icon={<LockOutlinedIcon fontSize="large" />}
        value={getCertificationsStat?.data ?? "-"}
        description={t("dataSecurityCompliance")}
        {...statBoxProps}
      />
    </StyledBox>
  );
}
