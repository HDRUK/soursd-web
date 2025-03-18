import { Chip, ChipProps, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

export enum Status {
  AFFILIATED = "affiliated",
  PENDING = "pending",
  INVITED = "invited",
  REGISTERED = "registered",
  INVITE_SENT = "invite_sent",
  APPROVED = "approved",
  COMPLETED = "completed",
}

interface ChipStatusProps extends ChipProps {
  status: Status;
}

const NAMESPACE_TRANSLATION = "Application";

export default function ChipStatus({ status, ...restProps }: ChipStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const theme = useTheme();

  let chipProps: ChipProps["sx"] = {
    color: "midGrey",
  };

  if (status === Status.AFFILIATED || status === Status.APPROVED) {
    chipProps = {
      color: "success",
    };
  } else if (status === Status.COMPLETED) {
    chipProps = {
      color: "white",
      border: "1px solid",
      borderColor: "midGrey",
    };
  }

  const { color, ...restChipSxProps } = chipProps;

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
        ...restChipSxProps,
        ...restProps.sx,
      }}
    />
  );
}
