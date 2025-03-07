import { User } from "@/types/application";
import { Box, Chip, ChipProps, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

interface UserStatusProps extends ChipProps {
  status: User["status"];
}

const NAMESPACE_TRANSLATION = "Application";

export default function UserStatus({ status, ...restProps }: UserStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return <Chip label={t(`userStatus_${status}`)} size="small" {...restProps} />;
}
