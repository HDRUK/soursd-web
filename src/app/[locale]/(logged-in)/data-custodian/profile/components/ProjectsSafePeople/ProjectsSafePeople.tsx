import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ChipStatus from "@/components/ChipStatus";
import Table from "@/components/Table";
import { FilterIcon, PrimaryContactIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import SearchActionMenu from "@/modules/SearchActionMenu";
import SearchBar from "@/modules/SearchBar";
import { useGetCustodianProjectUsers } from "@/services/custodians";
import {
  deleteProjectUserQuery,
  putProjectUserPrimaryContactQuery,
} from "@/services/projects";
import { DeleteProjectUserPayload } from "@/services/projects/types";
import { Organisation, ProjectUser, User } from "@/types/application";
import { renderUserNameCell } from "@/utils/cells";
import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import ProjectsAddUserModal from "../ProjectsAddUserModal";
import { UserGroup } from "@/consts/user";

interface ProjectsSafePeopleProps {
  id: number;
}

type FilteredUser = {
  affiliation_id: number;
  organisation_name: string;
  first_name: string;
  last_name: string;
  status: string;
  project_role_id?: number;
  primary_contact?: boolean;
};

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ProjectsSafePeople() {
  const { project, custodian } = useStore(state => ({
    project: state.getProject(),
    custodian: state.getCustodian(),
  }));

  const {
    data: usersData,
    updateQueryParams,
    resetQueryParams,
    last_page,
    total,
    setPage,
    handleFieldToggle,
    queryParams,
    refetch,
    ...queryState
  } = useGetCustodianProjectUsers(custodian.id, project.id, {
    defaultQueryParams: {
      "user_group[]": UserGroup.USERS,
    },
  });

  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const routes = useStore(state => state.getApplication().routes);
  const [showAddModal, setShowAddModal] = useState(false);

  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteProjectUserQuery()
  );

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  const getUsersFromResponse = (usersData: User[]) => {
    const users: FilteredUser[] = [];

    console.log("**** usersData", usersData);

    usersData?.forEach(
      ({ model_state, first_name, last_name, registry: { affiliations } }) => {
        affiliations?.forEach(
          ({
            id,
            primary_contact,
            project_role_id,
            organisation: { organisation_name },
          }) => {
            users.push({
              affiliation_id: id,
              organisation_name,
              first_name,
              last_name,
              project_role_id,
              primary_contact,
              status: model_state?.state.slug,
            });
          }
        );
      }
    );

    return users;
  };

  console.log("*****usersData", usersData);

  const users = getUsersFromResponse(usersData);

  console.log("*****users", users);

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
    <T extends FilteredUser>(info: CellContext<T, unknown>) => {
      return (
        <Box sx={{ display: "flex" }}>
          {renderUserNameCell(info, routes.profileCustodianUsersIdentity.path)}
          {!!info.row.original.primary_contact && <PrimaryContactIcon />}
        </Box>
      );
    },
    []
  );

  const renderActionMenuCell = useCallback(
    <T extends FilteredUser>(info: CellContext<T, unknown>) => {
      const { affiliation_id, primary_contact } = info.row.original;

      console.log("info.row.original", info.row.original);

      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              showDeleteConfirm({
                projectId: project.id,
                affiliationId: affiliation_id,
              });
            }}>
            {tApplication("removeUserFromProject")}
          </ActionMenuItem>
          <ActionMenuItem
            onClick={async () => {
              await makePrimaryContactAsync({
                projectId: project.id,
                affiliation_id: affiliation_id,
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

  const filterActions = [
    {
      label: tApplication("status_registered"),
      onClick: () => handleFieldToggle("status", ["registered", ""]), // Status' to be added
      checked: queryParams.status === "registered",
    },
  ];

  const columns: ColumnDef<FilteredUser>[] = [
    {
      cell: renderNameCell,
      accessorKey: "name",
      header: tApplication("name"),
    },
    {
      accessorKey: "project_role",
      header: tApplication("projectRole"),
    },
    {
      accessorKey: "organisation_name",
      header: tApplication("organisationName"),
    },
    {
      accessorKey: "status",
      header: tApplication("status"),
      cell: info => <ChipStatus status={info.row.original.status} />,
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
        custodianId={custodian.id}
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <Table
        total={total}
        last_page={last_page}
        setPage={setPage}
        data={users}
        columns={columns}
        queryState={queryState}
        isPaginated
      />
    </>
  );
}
