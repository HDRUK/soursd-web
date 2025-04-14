import { useStore } from "@/data/store";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { PageBody, PageSection } from "@/modules";
import SearchBar from "@/modules/SearchBar";
import { getOrganisationRegistriesQuery } from "@/services/organisations";
import { formatShortDate } from "@/utils/date";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { SearchDirections } from "@/consts/search";
import { User } from "@/types/application";
import Table from "@/components/Table";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { ActionMenu } from "@/components/ActionMenu";
import DecoupleUser from "../DecoupleDelegate";
import UserModal from "../UserModal";
import UserBulkInvite from "../UserBulkInvite";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [open, setOpen] = useState(false);
  const organisation = useStore(state => state.config.organisation);
  const [showPendingInvites, setShowPendingInvites] = useState(0);

  const {
    data: usersData,
    refetch: refetchOrganisationUsers,
    total,
    last_page,
    page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    ...userDataQueryState
  } = usePaginatedQuery({
    ...getOrganisationRegistriesQuery(organisation?.id as number),
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
      show_pending: showPendingInvites,
    },
    enabled: !!organisation,
  });

  const renderAccountCreated = (info: CellContext<User, unknown>) => (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {info.getValue() ? (
        <CancelIcon color="error" />
      ) : (
        <CheckCircleIcon color="success" />
      )}
    </Box>
  );

  const renderActions = (info: CellContext<User, unknown>) => (
    <ActionMenu>
      <DecoupleUser
        user={info.row.original}
        onSuccess={refetchOrganisationUsers}
        payload={{ organisation_id: null }}
        namespace="DecoupleUser"
      />
    </ActionMenu>
  );

  // task coming for this
  const renderSelectColumn = () => <Checkbox value />;

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: <Checkbox value />,
      cell: renderSelectColumn,
    },
    {
      accessorKey: "name",
      header: "Employee / Student name",
      cell: info =>
        `${info.row.original.first_name} ${info.row.original.last_name}`,
    },
    {
      accessorKey: "email",
      header: "Email Address",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "unclaimed",
      header: "SOURSD account",
      cell: renderAccountCreated,
    },
    {
      accessorKey: "created_at",
      header: "Invite Sent",
      cell: info => formatShortDate(info.getValue() as string),
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: renderActions,
    },
  ];

  return (
    <PageBody>
      <PageSection heading={t("employeeStudentAdminTitle")}>
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <Box component="form" role="search">
            <SearchBar
              onClear={() =>
                resetQueryParams({ show_pending: showPendingInvites })
              }
              onSearch={(text: string) => {
                updateQueryParams({
                  "first_name[]": text,
                  "last_name[]": text,
                  "email[]": text,
                });
              }}
            />
          </Box>
          <FormControlLabel
            label={t("showPendingInvites")}
            control={
              <Checkbox
                value
                onChange={event => {
                  const showPending = event.target.checked ? 1 : 0;
                  setShowPendingInvites(showPending);
                  updateQueryParams({
                    show_pending: showPending,
                  });
                }}
              />
            }
          />
          <Button variant="text">{t("clearAll")} </Button>
        </Box>

        <Table
          total={total}
          isPaginated
          page={page}
          setPage={setPage}
          last_page={last_page}
          data={usersData || []}
          columns={columns}
          queryState={userDataQueryState}
        />

        <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
          <div>
            <Button
              variant="outlined"
              aria-label="modal-button"
              onClick={() => setOpen(true)}>
              {t("inviteNewUserButton")}
            </Button>
          </div>
          <UserBulkInvite organisation_id={organisation?.id as number} />
        </Box>
      </PageSection>
      {!!organisation && (
        <UserModal
          organisation={organisation}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </PageBody>
  );
}
