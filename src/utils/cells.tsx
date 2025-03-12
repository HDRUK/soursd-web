import ChipStatus from "@/components/ChipStatus";
import { ResearcherAffiliation, User } from "@/types/application";
import { Link, Typography } from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import { injectParamsIntoPath } from "./application";
import { formatShortDate } from "./date";

function renderUserNameCell<T extends User>(
  info: CellContext<T, unknown>,
  route: string
) {
  const { first_name, last_name, id } = info.row.original;

  return (
    <Typography color="primary">
      <Link
        href={injectParamsIntoPath(route, {
          id,
        })}>
        {first_name} {last_name}
      </Link>
    </Typography>
  );
}

function renderChipStatus<T extends User>(info: CellContext<T, unknown>) {
  return <ChipStatus status={info.row.original.status} />;
}

function renderAffiliationDateRangeCell<T extends ResearcherAffiliation>(
  info: CellContext<T, unknown>
) {
  const { from, to } = info.row.original;

  if (!from) return null;

  return (
    <Typography>
      {formatShortDate(from)} - {to ? formatShortDate(to) : "Present"}
    </Typography>
  );
}

export { renderUserNameCell, renderChipStatus, renderAffiliationDateRangeCell };
