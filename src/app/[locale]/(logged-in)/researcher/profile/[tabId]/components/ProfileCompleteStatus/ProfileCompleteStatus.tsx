"use client";

import Text from "@/components/Text";
import { User } from "@/types/application";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

interface ProfileCompleteStatusProps {
  user: User | undefined;
}

export default function ProfileCompleteStatus({
  user,
}: ProfileCompleteStatusProps) {
  return (
    <>
      {user?.profile_completed_at && (
        <>
          <Text
            startIcon={<CheckCircleIcon color="success" />}
            sx={{ mb: 2, justifyContent: "center" }}>
            Profile complete
          </Text>
          <Text
            component="div"
            variant="caption"
            endIcon={
              <>
                <ContentCopyIcon />
                <Tooltip title="Your unique id is used by issuers to identify who you are.">
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
          startIcon={
            <Tooltip
              title={`Your user profile is not "complete". This will be visible to issuers and your organisation. Depending on their policies it may prevent you from accessing available research data.`}>
              <ErrorIcon color="error" />
            </Tooltip>
          }
          sx={{ justifyContent: "center" }}>
          Profile not complete
        </Text>
      )}
    </>
  );
}
