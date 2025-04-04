import Table from "@/components/Table";
import { Charity, Organisation } from "@/types/application";
import { Link } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface OrganisationsCharitiesTableProps {
  charitiesData: Charity[];
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations.Charities";

export default function OrganisationsCharitiesTable({
  charitiesData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsCharitiesTableProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

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
