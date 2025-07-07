import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import ChipStatus from "../../components/ChipStatus";
import Table from "../../components/Table";
import useColumns from "../../hooks/useColumns";
import { ResearcherProject } from "../../types/application";
import { ModuleTables } from "../../types/modules";
import { RouteConfig } from "../../types/router";
import {
  renderOrganisationsNameCell,
  renderProjectNameCell,
} from "../../utils/cells";
import { filterColumns } from "../../utils/table";

export type UserProjectsTableColumns = "title" | "organisations" | "status";

export interface UserProjectsTableProps
  extends ModuleTables<ResearcherProject, UserProjectsTableColumns> {
  routes?: {
    name: RouteConfig;
  };
}

export default function UserProjectsTable({
  routes,
  t,
  extraColumns,
  includeColumns = ["title", "organisations", "status"],
  ...restProps
}: UserProjectsTableProps) {
  const { createDefaultColumn } = useColumns<ResearcherProject>({ t });

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<ResearcherProject>[] = [
      createDefaultColumn("title", {
        cell: info => renderProjectNameCell(info, routes?.name.path),
      }),
      createDefaultColumn("organisations", {
        cell: info => renderOrganisationsNameCell(info.getValue()),
      }),
      createDefaultColumn("status", {
        cell: info => (
          <ChipStatus status={info.row.original.model_state?.state.slug} />
        ),
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, routes, t]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
