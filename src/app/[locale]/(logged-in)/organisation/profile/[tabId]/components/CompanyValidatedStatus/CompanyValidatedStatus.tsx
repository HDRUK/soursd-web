"use client";

import ContactLink from "@/components/ContactLink";
import Text from "@/components/Text";
import { Organisation } from "@/types/application";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import InfoIcon from "@mui/icons-material/Info";

interface ProfileCompleteStatusProps {
  organisation: Organisation;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function ProfileCompleteStatus({
  organisation,
}: ProfileCompleteStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <>
      {organisation.idvt_result && (
        <Text
          startIcon={<CheckCircleIcon color="success" />}
          sx={{ justifyContent: "center" }}>
          {t("companyValid")}
        </Text>
      )}
      {organisation.idvt_result === null && (
        <Text
          startIcon={
            <Tooltip title={t("companyValidatingPopup")}>
              <InfoIcon color="info" />
            </Tooltip>
          }>
          {t("companyValidating")}
        </Text>
      )}
      {organisation.idvt_result === false && (
        <Text
          startIcon={
            <Tooltip
              title={t.rich("companyNotValidPopup", {
                contactLink: ContactLink,
              })}>
              <ErrorIcon color="error" />
            </Tooltip>
          }
          sx={{ justifyContent: "center" }}>
          {t("companyNotValid")}
        </Text>
      )}
    </>
  );
}
