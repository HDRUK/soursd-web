import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { CustodianProjectUser, WithRoutes } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import {
  renderOrganisationsNameCell,
  renderProjectUserNameCell,
  renderStatusCell,
} from "../../utils/cells";
import { filterColumns } from "../../utils/table";

export type ProjectUsersTableColumns =
  | "name"
  | "projectRole"
  | "projectName"
  | "organisationName"
  | "status";

export type ProjectUsersTableProps = WithRoutes<
  ModuleTables<CustodianProjectUser, ProjectUsersTableColumns>
>;

export default function ProjectUsersTable({
  t,
  routes,
  includeColumns = [
    "name",
    "projectRole",
    "projectName",
    "organisationName",
    "status",
  ],
  extraColumns,
  ...restProps
}: ProjectUsersTableProps) {
  const { createDefaultColumn } = useColumns<CustodianProjectUser>({ t });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<CustodianProjectUser>[] = [
      createDefaultColumn("name", {
        accessorKey: "project_has_user",
        cell: info =>
          renderProjectUserNameCell(info.getValue(), routes?.name?.path),
      }),
      createDefaultColumn("projectRole", {
        accessorKey: "project_has_user.role.name",
      }),
      createDefaultColumn("projectName", {
        accessorKey: "project_has_user.project.title",
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
