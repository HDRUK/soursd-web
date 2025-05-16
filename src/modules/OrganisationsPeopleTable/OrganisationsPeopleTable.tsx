"use client";

import { useStore } from "@/data/store";
import { User } from "../../types/application";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import ChipStatus from "../../components/ChipStatus";
import Table, { TableProps } from "../../components/Table";
import { renderUserNameCell } from "../../utils/cells";

interface OrganisationsPeopleTableProps
  extends Omit<TableProps<User>, "columns"> {
  columns?: TableProps<User>["columns"];
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations.People";

export default function OrganisationsPeopleTable({
  tKey = NAMESPACE_TRANSLATION,
  columns,
  ...restProps
}: OrganisationsPeopleTableProps) {
  const t = useTranslations(tKey);
  const routes = useStore(state => state.getApplication().routes);

  const defaultColumns: ColumnDef<User>[] = columns || [
    {
      accessorKey: "name",
      header: t("name"),
      cell: info =>
        renderUserNameCell(
          info.row.original,
          routes.profileCustodianUsersProjects.path
        ),
    },
    {
      accessorKey: "registry.affiliations",
      header: t("email"),
      cell: info => info.getValue()?.[0].email,
    },
    {
      accessorKey: "registry.affiliations",
      header: t("affiliationStatus"),
      cell: info => (
        <ChipStatus status={info.getValue()?.[0].registryAffiliationState} />
      ),
    },
  ];

  return <Table columns={defaultColumns} isPaginated {...restProps} />;
}
