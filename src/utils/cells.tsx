import UserStatus from "@/components/UserStatus";
import { User } from "@/types/application";
import { Link, Typography } from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import { injectParamsIntoPath } from "./application";

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

function renderUserStatus<T extends User>(info: CellContext<T, unknown>) {
  return <UserStatus status={info.row.original.status} />;
}

export { renderUserNameCell, renderUserStatus };
