import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import Table from "@/components/Table";
import { FilterIcon, PrimaryContactIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import SearchActionMenu from "@/modules/SearchActionMenu";
import SearchBar from "@/modules/SearchBar";
import {
  deleteProjectUserQuery,
  putProjectUserPrimaryContactQuery,
} from "@/services/projects";
import useProjectUsersQuery from "@/services/projects/getProjectUsersQuery";
import { DeleteProjectUserPayload } from "@/services/projects/types";
import { Organisation, ProjectUser, User } from "@/types/application";
import { renderUserNameCell, renderUserStatus } from "@/utils/cells";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface ProjectsSafePeopleProps {
  id: number;
}

type FilteredUser = User &
  Pick<Organisation, "organisation_name"> & {
    project_role: string;
    primary_contact: number;
  };

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ProjectsSafePeople({ id }: ProjectsSafePeopleProps) {
  const {
    data: usersData,
    updateQueryParam,
    last_page,
    total,
    setPage,
    handleFieldToggle,
    queryParams,
    refetch,
    ...queryState
  } = useProjectUsersQuery(id);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const routes = useStore(state => state.getApplication().routes);

  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteProjectUserQuery()
  );

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  const getUsersFromResponse = (usersData: ProjectUser[]) => {
    const users: FilteredUser[] = [];

    usersData?.forEach(
      ({ primary_contact, role, registry: { user, organisations } }) => {
        organisations?.forEach(({ organisation_name }) => {
          users.push({
            organisation_name,
            ...user,
            project_role: role.name,
            primary_contact,
          });
        });
      }
    );

    return users;
  };

  const users = getUsersFromResponse(usersData);

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

  const renderActionMenuCell = <T extends FilteredUser>(
    info: CellContext<T, unknown>
  ) => {
    const { registry_id, primary_contact } = info.row.original;

    return (
      <ActionMenu>
        <ActionMenuItem
          onClick={() => {
            showDeleteConfirm({
              projectId: id,
              registryId: registry_id,
            });
          }}>
          {tApplication("removeUserFromProject")}
        </ActionMenuItem>
        <ActionMenuItem
          onClick={async () => {
            await makePrimaryContactAsync({
              projectId: id,
              registryId: registry_id,
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
  };

  const filterActions = [
    {
      label: tApplication("userStatus_registered"),
      onClick: () => handleFieldToggle("status", ["registered", ""]),
      checked: queryParams.status === "registered",
    },
  ];

  const columns: ColumnDef<FilteredUser>[] = [
    {
      cell: info => {
        return (
          <Box sx={{ display: "flex" }}>
            {renderUserNameCell(
              info,
              routes.profileCustodianUsersIdentity.path
            )}
            {!!info.row.original.primary_contact && <PrimaryContactIcon />}
          </Box>
        );
      },
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
      cell: renderUserStatus,
    },
    {
      header: tApplication("actions"),
      cell: renderActionMenuCell,
    },
  ];

  return (
    <>
      <Box component="form" role="search">
        <SearchBar
          updateQueryParam={(text: string) => updateQueryParam("name[]", text)}
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
      </Box>
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
