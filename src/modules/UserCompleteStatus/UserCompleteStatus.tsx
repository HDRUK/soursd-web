"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { User } from "../../types/application";
import Text from "../../components/Text";

export interface UserCompleteStatusProps {
  user: User | undefined;
}

const NAMESPACE_TRANSLATION_USER = "UserCompleteStatus";

export default function UserCompleteStatus({ user }: UserCompleteStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_USER);

  return (
    <>
      {user?.profile_completed_at && (
        <Text startIcon={<CheckCircleIcon color="success" />}>
          {t("profileComplete")}
        </Text>
      )}
      {!user?.profile_completed_at && (
        <Text
          fontStyle="italic"
          startIcon={
            <Tooltip title={t("profileNotCompletePopup")}>
              <ErrorIcon color="error" />
            </Tooltip>
          }>
          {t("profileNotComplete")}
        </Text>
      )}
    </>
  );
}
