import Table from "@/modules/Table";
import { getOrganisationUsers } from "@/services/organisations";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { formatShortDate } from "@/utils/date";
import { User } from "@/types/application";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import { Box } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditDelegate from "../EditDelegate";
import DecoupleUser from "../../DecoupleUser";

const DelegateTable = () => {
  const organisation = useStore(state => state.config.organisation);

  const {
    isError: isGetUsersError,
    isLoading: isGetUsersLoading,
    data: usersData,
    refetch: refetchOrganisationUsers,
    last_page,
    page,
    setPage,
  } = usePaginatedQuery({
    queryKeyBase: ["getOrganisationUsers", organisation?.id],
    queryFn: queryParams => {
      return getOrganisationUsers(organisation?.id as number, queryParams, {
        error: {
          message: "getUsersError",
        },
      });
    },
    enabled: !!organisation,
  });

  const renderAccountCreated = (info: CellContext<User, unknown>) =>
    info.getValue() ? null : (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TaskAltIcon color="success" />
      </Box>
    );

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
      cell: info => info.row.original.departments[0]?.name || "",
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
      cell: info => (
        <>
          <EditDelegate user={info.row.original} />
          <DecoupleUser
            user={info.row.original}
            onSuccess={refetchOrganisationUsers}
            payload={{ is_delegate: 0 }}
            namespace="DecoupleDelegate"
          />
        </>
      ),
    },
  ];

  return (
    <LoadingWrapper loading={isGetUsersLoading}>
      <Table data={usersData} columns={columns} />
    </LoadingWrapper>
  );
};

export default DelegateTable;
