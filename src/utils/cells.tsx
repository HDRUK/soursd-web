import {
  Project,
  ResearcherAffiliation,
  User,
  ProjectAllUser,
  Organisation,
  ResearcherProject,
  CustodianUser,
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

function renderLinkNameCell(
  name: string,
  route: string,
  options: Record<string, number>
) {
  return (
    <Typography color="primary">
      <Link href={injectParamsIntoPath(route, options)}>{name}</Link>
    </Typography>
  );
}

function renderUserNameCell(
  user: User | ProjectAllUser | CustodianUser,
  route?: string,
  options: Record<string, number> = {}
) {
  if (!user) return "";

  const { first_name, last_name, id } = user;

  return route && id
    ? renderLinkNameCell(`${first_name} ${last_name}`, route, {
        userId: id,
        ...options,
      })
    : `${first_name} ${last_name}`;
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

function renderListNameCell(values: string[] | undefined) {
  return (values || []).map(value => value).join(", ");
}

function renderProjectsNameCell(values: ResearcherProject[]) {
  return renderListNameCell((values || []).map(({ title }) => title));
}

function renderOrganisationsNameCell(values: Organisation[]) {
  return renderListNameCell(
    (values || []).map(({ organisation_name }) => organisation_name)
  );
}

export {
  renderProjectNameCell,
  renderUserNameCell,
  renderAffiliationDateRangeCell,
  renderWarningCell,
  renderListNameCell,
  renderLinkNameCell,
  renderOrganisationsNameCell,
  renderProjectsNameCell,
};
