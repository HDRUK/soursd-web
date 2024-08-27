"use client";

import Text from "@/components/Text";
import { User } from "@/types/application";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";

interface ProfileCompleteStatusProps {
  user: User | undefined;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileCompleteStatus";

export default function ProfileCompleteStatus({
  user,
}: ProfileCompleteStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <>
      {user?.profile_completed_at && (
        <>
          <Text
            startIcon={<CheckCircleIcon color="success" />}
            sx={{ justifyContent: "center" }}>
            {t("profileComplete")}
          </Text>
          <Text
            component="div"
            variant="caption"
            endIcon={
              <>
                <ContentCopyIcon />
                <Tooltip title={t("uniqueIdPopup")}>
                  <InfoIcon color="info" />
                </Tooltip>
              </>
            }
            sx={{
              backgroundColor: "beige",
              p: 1,
              width: "100%",
              justifyContent: "center",
              borderRadius: 1,
            }}>
            [Unique id here]
          </Text>
        </>
      )}
      {!user?.profile_completed_at && (
        <Text
          fontStyle="italic"
          startIcon={
            <Tooltip title={t("profileNotCompletePopup")}>
              <ErrorIcon color="error" />
            </Tooltip>
          }
          sx={{ justifyContent: "center" }}>
          {t("profileNotComplete")}
        </Text>
      )}
    </>
  );
}
