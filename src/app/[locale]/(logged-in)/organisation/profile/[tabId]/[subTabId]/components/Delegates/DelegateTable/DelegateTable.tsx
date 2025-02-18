import Table from "@/modules/Table";
import { getOrganisationDelegates } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import { formatShortDate } from "@/utils/date";
import { User } from "@/types/application";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import FormModal from "@/components/FormModal";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useTranslations } from "next-intl";
import EditDelegate from "../EditDelegate";
import DecoupleUser from "../DecoupleDelegate";
import InviteDelegateForm from "../InviteDelegateForm";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const DelegateTable = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const organisation = useStore(state => state.config.organisation);

  const {
    isLoading: isGetUsersLoading,
    data: delegatesData,
    refetch: refetchDelegates,
  } = useQuery({
    queryKey: ["getOrganisationDelegates", organisation?.id],
    queryFn: ({ queryKey }) => {
      return getOrganisationDelegates(queryKey[1] as number, {
        error: {
          message: "getUsersError",
        },
      });
    },
    enabled: !!organisation,
  });

  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);

  const renderAccountCreated = (info: CellContext<User, unknown>) =>
    info.getValue() ? null : (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TaskAltIcon color="success" />
      </Box>
    );

  const renderActions = (info: CellContext<User, unknown>) => (
    <>
      <EditDelegate user={info.row.original} onSuccess={refetchDelegates} />
      <DecoupleUser
        user={info.row.original}
        onSuccess={refetchDelegates}
        payload={{ is_delegate: 0 }}
        namespace="DecoupleDelegate"
      />
    </>
  );

  console.log(delegatesData?.data);

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

  return (
    <LoadingWrapper loading={isGetUsersLoading}>
      <Table data={delegatesData?.data || []} columns={columns} />

      <Button variant="outlined" onClick={() => setOpenInviteModal(true)}>
        {tProfile("inviteAnotherDelegate")}
      </Button>
      <FormModal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}>
        <InviteDelegateForm
          onSuccess={() => {
            setOpenInviteModal(false);
            refetchDelegates();
          }}
        />
      </FormModal>
    </LoadingWrapper>
  );
};

export default DelegateTable;
