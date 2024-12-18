import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface UserRegisteredStatusProps {
  registered?: boolean;
}

const NAMESPACE_TRANSLATION = "Application";

export default function UserRegisteredStatus({
  registered,
}: UserRegisteredStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <Typography
      color="caption.main"
      sx={{
        textTransform: "uppercase",
      }}>
      {t("registered")}:{" "}
      <Box
        component="span"
        sx={{
          color: registered ? "success.main" : "error.main",
        }}>
        {registered ? t("yes") : t("no")}
      </Box>
    </Typography>
  );
}
