"use client";

import ChipStatus from "@/components/ChipStatus";
import Table, { TableProps } from "@/components/Table";
import { useStore } from "@/data/store";
import { Organisation } from "@/types/application";
import { renderLinkNameCell, renderUserNameCell } from "@/utils/cells";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface OrganisationsProjectsTableProps
  extends Omit<TableProps<Organisation>, "columns"> {
  columns?: TableProps<Organisation>["columns"];
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations";

export default function OrganisationsProjectsTable({
  tKey = NAMESPACE_TRANSLATION,
  columns,
  ...restProps
}: OrganisationsProjectsTableProps) {
  const t = useTranslations(tKey);
  const routes = useStore(state => state.getApplication().routes);

  const defaultColumns: ColumnDef<Organisation>[] = columns || [
    {
      accessorKey: "organisation_name",
      header: t("organisationName"),
      cell: info =>
        renderLinkNameCell(
          info.getValue(),
          routes.profileCustodianOrganisationsPeople.path,
          { id: info.row.original.id }
        ),
    },
    {
      accessorKey: "project.title",
      header: t("projects"),
    },
    {
      accessorKey: "sro_officer",
      header: t("sroOfficer"),
      cell: info => renderUserNameCell(info.getValue()),
    },
    {
      accessorKey: "project.model_state.state.slug",
      header: t("projectStatus"),
      cell: info => <ChipStatus status={info.getValue()} />,
    },
  ];

  return <Table columns={defaultColumns} isPaginated {...restProps} />;
}
