import { EditIcon, TrashIcon } from "@/consts/icons";
import useColumns from "@/hooks/useColumns";
import { ModuleTables } from "@/types/modules";
import { filterColumns } from "@/utils/table";
import { Typography } from "@mui/material";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../components/Table";
import { Subsidiary } from "../../types/application";
import { formatAddress } from "../../utils/address";

export type OrganisationsSubsidiariesTableColumns =
  | "organisationName"
  | "address"
  | "actions";

export type OrganisationsSubsidiariesTableProps = ModuleTables<
  Subsidiary,
  OrganisationsSubsidiariesTableColumns
> & {
  onEdit?: (subsidiary: Subsidiary) => void;
  onDelete?: (subsidiary: Subsidiary) => void;
};

export default function OrganisationsSubsidiariesTable({
  onEdit,
  onDelete,
  t,
  includeColumns = ["organisationName", "address", "actions"],
  extraColumns,
  ...restProps
}: OrganisationsSubsidiariesTableProps) {
  const { createDefaultColumn } = useColumns<Subsidiary>({
    t,
  });

  const renderNameCell = (info: CellContext<Subsidiary, unknown>) => (
    <Typography color="primary">{info.getValue() as string}</Typography>
  );

  const renderActions = (info: CellContext<Subsidiary, unknown>) => (
    <>
      {onEdit && (
        <EditIcon
          titleAccess={t("edit")}
          onClick={() => onEdit(info.row.original)}
        />
      )}
      {onDelete && (
        <TrashIcon
          titleAccess={t("delete")}
          onClick={() => onDelete(info.row.original)}
        />
      )}
    </>
  );

  const columns = useMemo(() => {
    const initialColumns: ColumnDef<Subsidiary>[] = [
      createDefaultColumn("organisationName", {
        accessorKey: "name",
        cell: renderNameCell,
      }),
      createDefaultColumn("address", {
        cell: ({ row: { original } }) => formatAddress(original),
      }),
      createDefaultColumn("actions", {
        cell: renderActions,
      }),
    ];

    return filterColumns(initialColumns, includeColumns, extraColumns || []);
  }, [includeColumns, extraColumns, t]);

  return <Table columns={columns} isPaginated {...restProps} />;
}
