import Table from "@/components/Table";
import { FilterIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import SearchActionMenu from "@/modules/SearchActionMenu";
import SearchBar from "@/modules/SearchBar";
import { deleteProjectUserQuery } from "@/services/projects";
import useProjectUsersQuery from "@/services/projects/getProjectUsersQuery";
import { DeleteProjectUserPayload } from "@/services/projects/types";
import { Organisation, ProjectUser, User } from "@/types/application";
import { renderUserNameCell } from "@/utils/cells";
import { Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

interface ProjectsSafePeopleProps {
  id: number;
}

type FilteredUser = User & Pick<Organisation, "organisation_name">;

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

  const getUsersFromResponse = (usersData: ProjectUser[]) => {
    const users: FilteredUser[] = [];

    usersData?.forEach(({ registry: { user, organisations } }) => {
      organisations?.forEach(({ organisation_name }) => {
        users.push({
          organisation_name,
          ...user,
          project_status: "Live",
          project_role: "Data analyst",
        });
      });
    });

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

  const renderActionMenuCell = <T extends FilteredUser>(
    info: CellContext<T, unknown>
  ) => {
    const { registry_id } = info.row.original;

    //This will be an action menu
    return (
      <Button
        onClick={async () => {
          showDeleteConfirm({
            projectId: id,
            registryId: registry_id,
          });
        }}>
        Delete
      </Button>
    );
  };

  const filterActions = [
    {
      label: tApplication("userStatusLive"),
      onClick: () => handleFieldToggle("status", ["live", ""]),
      checked: queryParams.status === "live",
    },
  ];

  const columns: ColumnDef<FilteredUser>[] = [
    {
      cell: row =>
        renderUserNameCell(row, routes.profileCustodianUsersIdentity.path),
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
      accessorKey: "project_status",
      header: tApplication("projectStatus"),
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
