"use client";

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { File as AppFile } from "../../types/application";
import { formatDisplayShortDate } from "../../utils/date";
import { getFileHref } from "../../utils/file";
import { StyledCertificationLink } from "./UserHistoryEntry.styles";

interface UserHistoryEntryProps {
  heading: ReactNode;
  startDate: string;
  description: ReactNode;
  endDate?: string;
  certification: AppFile[] | undefined;
}

const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

export default function UserHistoryEntry({
  heading,
  startDate,
  endDate,
  description,
  certification,
}: UserHistoryEntryProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);
  const router = useRouter();
  const isCertificationPresent = !!certification && certification.length > 0;
  const certificationText = `${isCertificationPresent ? certification.map(file => file.name) : "Not Uploaded"}`;
  const href = getFileHref(
    certification?.map(file => file.name)?.[0] ?? "default-filename"
  );
  return (
    <Box sx={{ marginBottom: "8px" }}>
      <Box
        sx={{
          display: {
            sm: "block",
            md: "flex",
          },
          gap: 4,
        }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>{" "}
        <Typography
          sx={{
            pt: "0.1rem",
            minWidth: "160px",
            textAlign: {
              sm: "initial",
              md: "right",
            },
          }}>
          {formatDisplayShortDate(startDate)}{" "}
          {endDate && `- ${formatDisplayShortDate(endDate)}`}
        </Typography>
      </Box>
      <Typography sx={{ color: "textSecondary.main" }}>
        {description}
      </Typography>
      <Typography sx={{ color: "textSecondary.main", display: "flex" }}>
        {t("certification")}
        <StyledCertificationLink
          hasCertification={isCertificationPresent && certification.length > 0}
          onClick={() => router.push(href)}
          component="button"
          disabled={!certification}>
          {certificationText}
        </StyledCertificationLink>
      </Typography>
    </Box>
  );
}
