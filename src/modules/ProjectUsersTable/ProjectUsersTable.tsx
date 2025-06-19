import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { RouteConfig } from "@/types/router";
import { filterColumns } from "@/utils/table";
import { Box } from "@mui/system";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../components/Table";
import { PrimaryContactIcon } from "../../consts/icons";
import { CustodianProjectUser, ProjectUser } from "../../types/application";
import {
  renderOrganisationsNameCell,
  renderStatusCell,
  renderUserNameCell,
} from "../../utils/cells";

export type ProjectUsersTableColumns =
  | "name"
  | "projectRole"
  | "organisationName"
  | "status";

export interface ProjectUsersTableProps
  extends ModuleTables<CustodianProjectUser, ProjectUsersTableColumns> {
  routes?: {
    name: RouteConfig;
  };
}

export default function ProjectUsersTable({
  t,
  routes,
  includeColumns = ["name", "projectRole", "organisationName", "status"],
  extraColumns,
  ...restProps
}: ProjectUsersTableProps) {
  const { createDefaultColumn } = useColumns<CustodianProjectUser>({ t });

  console.log("restProps.data", restProps.data);

  const renderNameCell = <T extends CustodianProjectUser>(
    info: CellContext<T, unknown>
  ) => {
    const user = info.getValue() as ProjectUser;

    return (
      <Box sx={{ display: "flex" }}>
        {renderUserNameCell(user as ProjectUser, routes?.name?.path, {
          projectUserId: info.row.original.id,
        })}
        {!!user.primary_contact && <PrimaryContactIcon />}
      </Box>
    );
  };

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<CustodianProjectUser>[] = [
      createDefaultColumn("name", {
        accessorKey: "project_has_user.registry.user",
        cell: renderNameCell,
      }),
      createDefaultColumn("projectRole", {
        accessorKey: "project_has_user.role.name",
      }),
      createDefaultColumn("organisationName", {
        accessorKey: "project_has_user.affiliation.organisation",
        cell: info => renderOrganisationsNameCell(info.getValue()),
      }),
      createDefaultColumn("status", {
        accessorKey: "model_state.state.slug",
        cell: renderStatusCell,
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, routes, t]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
