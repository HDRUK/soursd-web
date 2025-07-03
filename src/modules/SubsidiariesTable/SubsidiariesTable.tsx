import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Table from "../../components/Table";
import { Subsidiary } from "../../types/application";
import { formatAddress } from "../../utils/address";

export interface SubsidiariesTableProps {
  subsidiariesData: Subsidiary[];
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Subsidiaries";

export default function SubsidiariesTable({
  subsidiariesData,
  tKey = NAMESPACE_TRANSLATION,
}: SubsidiariesTableProps) {
  const t = useTranslations(tKey);

  const columns: ColumnDef<Subsidiary>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "address",
      header: t("address"),
      cell: ({ row: { original } }) => formatAddress(original),
    },
  ];

  return (
    <Table
      total={subsidiariesData.length}
      data={subsidiariesData || []}
      columns={columns}
      queryState={{}}
    />
  );
}
