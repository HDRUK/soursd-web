"use client";

import { Box, BoxProps, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import ChipStatus, { Status } from "../ChipStatus";

export interface StatusListProps {
  projectStatus?: Status;
  validationStatus?: Status;
  organisationStatus?: Status;
  affiliationStatus?: Status;
  panelSx?: BoxProps["sx"];
}

const NAMESPACE_TRANSLATION = "Application";

export default function StatusList({
  projectStatus,
  validationStatus,
  organisationStatus,
  affiliationStatus,
  panelSx,
}: StatusListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const statuses: { label: string; value?: Status }[] = [
    { label: t("projectStatus"), value: projectStatus },
    { label: t("validationStatus"), value: validationStatus },
    { label: t("organisationStatus"), value: organisationStatus },
    { label: t("affiliationStatus"), value: affiliationStatus },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        backgroundColor: "neutralGrey.main",
        p: 3,
        gap: 1,
        mb: 2,
        ...panelSx,
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}>
        {statuses
          .filter(s => s.value)
          .map(({ label, value }) => (
            <Box
              key={label}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography sx={{ minWidth: "150px" }}>{label}:</Typography>
              <ChipStatus status={value} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
