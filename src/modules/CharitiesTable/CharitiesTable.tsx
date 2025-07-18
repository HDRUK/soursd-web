import { Link } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Charity } from "../../types/application";
import Table from "../../components/Table";

export interface CharitiesTableProps {
  charitiesData: Charity[];
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Charities";

export default function CharitiesTable({
  charitiesData,
  tKey = NAMESPACE_TRANSLATION,
}: CharitiesTableProps) {
  const t = useTranslations(tKey);

  const columns: ColumnDef<Charity>[] = [
    {
      accessorKey: "registration_id",
      header: t("registrationId"),
    },
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "website",
      header: t("website"),
      cell: info => (
        <Link href={info.getValue()} target="_blank">
          {info.getValue()}
        </Link>
      ),
    },
  ];

  return (
    <Table
      total={charitiesData.length}
      data={charitiesData || []}
      columns={columns}
      queryState={{}}
    />
  );
}
