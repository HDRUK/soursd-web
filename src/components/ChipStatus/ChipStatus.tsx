import { Chip, ChipProps } from "@mui/material";
import { useTranslations } from "next-intl";

export enum Status {
  AFFILIATED = "affiliated",
  PENDING = "pending",
  INVITED = "invited",
  REGISTERED = "registered",
  INVITE_SENT = "invite_sent",
  APPROVED = "approved",
  COMPLETED = "completed",
  PROJECT_APPROVED = "project_approved",
  PROJECT_COMPLETED = "project_completed",
  PROJECT_PENDING = "project_pending",
  AFFILIATION_INVITED = "affiliation_invited",
  AFFILIATION_PENDING = "affiliation_pending",
  AFFILIATION_APPROVED = "affiliation_approved",
  AFFILIATION_REJECTED = "affiliation_rejected",
}

interface ChipStatusProps extends ChipProps {
  status: Status | undefined;
}

const NAMESPACE_TRANSLATION = "Application";

export default function ChipStatus({ status, ...restProps }: ChipStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  let chipProps: ChipProps["sx"] = {
    color: "midGrey",
  };

  if (
    status === Status.AFFILIATED ||
    status === Status.APPROVED ||
    status === Status.PROJECT_APPROVED ||
    status === Status.AFFILIATION_APPROVED
  ) {
    chipProps = {
      color: "success",
    };
  } else if (status === Status.AFFILIATION_REJECTED) {
    chipProps = {
      color: "error",
    };
  } else if (
    status === Status.COMPLETED ||
    status === Status.PROJECT_COMPLETED
  ) {
    chipProps = {
      color: "clear",
      border: "1px solid",
      borderColor: "midGrey",
    };
  } else if (!status) {
    chipProps = {
      color: "warning",
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
