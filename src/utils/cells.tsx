import {
  Project,
  ResearcherAffiliation,
  User,
  ProjectAllUser,
} from "@/types/application";
import { Link, Typography } from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { injectParamsIntoPath } from "./application";
import { formatShortDate } from "./date";

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

function renderProjectNameCell<T extends Project>(
  info: CellContext<T, unknown>,
  route: string
) {
  const { title, id } = info.row.original;

  return (
    <Typography color="primary">
      <Link
        href={injectParamsIntoPath(route, {
          id,
        })}>
        {title}
      </Link>
    </Typography>
  );
}

function renderUserNameCell(user: User | ProjectAllUser, route?: string) {
  const { first_name, last_name, id } = user;

  return route && id ? (
    <Typography color="primary">
      <Link
        href={injectParamsIntoPath(route, {
          id,
        })}>
        {first_name} {last_name}
      </Link>
    </Typography>
  ) : (
    `${first_name} ${last_name}`
  );
}

function renderWarningCell<T extends ResearcherAffiliation>(
  info: CellContext<T, unknown>
) {
  const { organisation_id, email } = info.row.original;

  if (!organisation_id || !email) {
    return <WarningAmberOutlinedIcon sx={{ color: "warning.main" }} />;
  }
  return null;
}

export {
  renderProjectNameCell,
  renderUserNameCell,
  renderAffiliationDateRangeCell,
  renderWarningCell,
};
