import { Chip, ChipProps } from "@mui/material";
import { useTranslations } from "next-intl";

export enum Status {
  AFFILIATED = "affiliated",
  PENDING = "pending",
  INVITED = "invited",
  REGISTERED = "registered",
  INVITE_SENT = "invite_sent",
}

interface ChipStatusProps extends ChipProps {
  status: Status;
}

const NAMESPACE_TRANSLATION = "Application";

export default function ChipStatus({ status, ...restProps }: ChipStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  let color = "midGrey";

  if (status === Status.AFFILIATED) {
    color = "success";
  }
  return (
    <Chip
      label={t(`status_${status}`)}
      size="small"
      {...restProps}
      sx={{
        backgroundColor: `${color}.main`,
        "& > .MuiChip-label": {
          color: `${color}.contrastText`,
        },
        ...restProps.sx,
      }}
    />
  );
}
