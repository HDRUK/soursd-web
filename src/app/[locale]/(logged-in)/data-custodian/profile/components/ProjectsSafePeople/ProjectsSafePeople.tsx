import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ChipStatus, { Status } from "@/components/ChipStatus";
import Table from "@/components/Table";
import { FilterIcon, PrimaryContactIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import SearchActionMenu from "@/modules/SearchActionMenu";
import SearchBar from "@/modules/SearchBar";
import {
  useGetProjectUsers,
  deleteProjectUserQuery,
  putProjectUserPrimaryContactQuery,
} from "@/services/projects";
import { DeleteProjectUserPayload } from "@/services/projects/types";
import { ProjectUser, User } from "@/types/application";
import { renderUserNameCell } from "@/utils/cells";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import ProjectsAddUserModal from "../ProjectsAddUserModal";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ProjectsSafePeople() {
  const { project, custodian } = useStore(state => ({
    project: state.getProject(),
    custodian: state.getCustodian(),
  }));

  const {
    data: projectUsers,
    updateQueryParams,
    resetQueryParams,
    last_page,
    total,
    setPage,
    handleFieldToggle,
    queryParams,
    refetch,
    ...queryState
  } = useGetProjectUsers(project.id);

  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const routes = useStore(state => state.getApplication().routes);
  const [showAddModal, setShowAddModal] = useState(false);

  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteProjectUserQuery()
  );

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  const showDeleteConfirm = useQueryConfirmAlerts<DeleteProjectUserPayload>(
    deleteQueryState,
    {
      confirmAlertProps: {
        willClose: async payload => {
          await deleteUserAsync(payload as DeleteProjectUserPayload);

          refetch();
        },
      },
    }
  );

  useQueryAlerts(primaryContactQueryState);

  const renderNameCell = useCallback(
    <T extends ProjectUser>(info: CellContext<T, unknown>) => {
      return (
        <Box sx={{ display: "flex" }}>
          {renderUserNameCell(
            info.getValue() as User,
            routes.profileCustodianUsersIdentity.path
          )}
          {!!info.row.original.primary_contact && <PrimaryContactIcon />}
        </Box>
      );
    },
    [routes]
  );

  const renderActionMenuCell = useCallback(
    <T extends ProjectUser>(info: CellContext<T, unknown>) => {
      const { affiliation, primary_contact } = info.row.original;

      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              showDeleteConfirm({
                projectId: project.id,
                affiliationId: affiliation.id,
              });
            }}>
            {tApplication("removeUserFromProject")}
          </ActionMenuItem>
          <ActionMenuItem
            onClick={async () => {
              await makePrimaryContactAsync({
                projectId: project.id,
                affiliationId: affiliation.id,
                primaryContact: !primary_contact,
              });

              refetch();
            }}>
            {!primary_contact
              ? tApplication("makePrimaryContact")
              : tApplication("removeAsPrimaryContact")}
          </ActionMenuItem>
        </ActionMenu>
      );
    },
    []
  );

  const renderStatus = (info: CellContext<ProjectUser, unknown>) => (
    <ChipStatus status={info.getValue() as Status} />
  );

  const filterActions = [
    {
      label: tApplication("status_registered"),
      onClick: () => handleFieldToggle("status", ["registered", ""]), // Status' to be added
      checked: queryParams.status === "registered",
    },
  ];

  const columns: ColumnDef<ProjectUser>[] = [
    {
      cell: renderNameCell,
      accessorKey: "registry.user",
      header: tApplication("name"),
    },
    {
      accessorKey: "role.name",
      header: tApplication("projectRole"),
    },
    {
      accessorKey: "affiliation.organisation.organisation_name",
      header: tApplication("organisationName"),
    },
    {
      accessorKey: "registry.user.status",
      header: tApplication("status"),
      cell: renderStatus,
    },
    {
      header: tApplication("actions"),
      cell: renderActionMenuCell,
    },
  ];

  return (
    <>
      <Grid
        container
        component="form"
        role="search"
        columnSpacing={5}
        rowSpacing={2}>
        <Grid item xs={12} md={10}>
          <SearchBar
            onClear={resetQueryParams}
            onSearch={(text: string) => {
              updateQueryParams({
                "first_name[]": text,
                "last_name[]": text,
                "email[]": text,
              });
            }}
            placeholder={t("searchPlaceholder")}>
            <SearchActionMenu
              actions={filterActions}
              startIcon={<FilterIcon />}
              renderedSelectedLabel={tApplication("filteredBy")}
              renderedDefaultLabel={tApplication("filterByUserStatus")}
              aria-label={tApplication("filterBy")}
              multiple
            />
          </SearchBar>
        </Grid>
        <Grid item xs={12} md={2} sx={{ textAlign: "right" }}>
          <Button
            startIcon={<Add />}
            onClick={() => {
              setShowAddModal(true);
            }}>
            Add New Member
          </Button>
        </Grid>
      </Grid>
      <ProjectsAddUserModal
        projectId={project.id}
        custodianId={custodian?.id as number}
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <Table
        total={total}
        last_page={last_page}
        setPage={setPage}
        data={projectUsers}
        columns={columns}
        queryState={queryState}
        isPaginated
      />
    </>
  );
}
