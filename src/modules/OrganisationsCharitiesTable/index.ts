export default function OrganisationsCharitiesTable() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
      cell: info =>
        `${info.row.original.first_name} ${info.row.original.last_name}`,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: info => info?.row?.original?.departments?.[0]?.name,
    },
    {
      accessorKey: "created_at",
      header: "Invited On",
      cell: info => formatShortDate(info.getValue() as string),
    },
    {
      accessorKey: "unclaimed",
      header: "Account created",
      cell: renderAccountCreated,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: renderActions,
    },
  ];
}
