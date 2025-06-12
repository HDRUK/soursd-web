import { useStore } from "@/data/store";
import { Add } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import { Box, Button, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import ChipStatus, { Status } from "../../components/ChipStatus";
import ProjectsAddUserModal from "../../components/ProjectsAddUserModal";
import Table from "../../components/Table";
import { FilterIcon, PrimaryContactIcon } from "../../consts/icons";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import useQueryConfirmAlerts from "../../hooks/useQueryConfirmAlerts";
import { PageBody, PageSection } from "../../modules";
import SearchActionMenu from "../../modules/SearchActionMenu";
import SearchBar from "../../modules/SearchBar";
import {
  deleteProjectUserQuery,
  putProjectUserPrimaryContactQuery,
  useGetProjectUsers,
} from "../../services/projects";
import { DeleteProjectUserPayload } from "../../services/projects/types";
import { EntityType } from "../../types/api";
import { ProjectUser, User } from "../../types/application";
import {
  renderOrganisationsNameCell,
  renderUserNameCell,
} from "../../utils/cells";
import ProjectsSafePeopleBoard from "../ProjectsSafePeopleBoard";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

interface ProjectsSafePeopleProps {
  variant: EntityType;
}

export default function ProjectsSafePeople({
  variant,
}: ProjectsSafePeopleProps) {
  const project = useStore(state => state.getCurrentProject());

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
  const [showListView, setShowListView] = useState(true);

  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteProjectUserQuery()
  );

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  const showDeleteConfirm = useQueryConfirmAlerts<DeleteProjectUserPayload>(
    deleteQueryState,
    {
      confirmAlertProps: {
        preConfirm: async payload => {
          await deleteUserAsync(payload as DeleteProjectUserPayload);
          refetch();
        },
      },
    }
  );

  useQueryAlerts(primaryContactQueryState);

  let userPath;
  switch (variant) {
    case EntityType.CUSTODIAN:
      userPath = routes.profileCustodianUsersIdentity.path;
      break;
    case EntityType.ORGANISATION:
      userPath = routes.profileOrganisationUsersIdentity.path;
      break;
    case EntityType.USER:
      userPath = undefined;
      break;
    default:
      userPath = undefined;
  }
  const renderNameCell = useCallback(
    <T extends ProjectUser>(info: CellContext<T, unknown>) => {
      return (
        <Box sx={{ display: "flex" }}>
          {renderUserNameCell(info.getValue() as User, userPath, {
            projectId: project.id,
          })}
          {!!info.row.original.primary_contact && <PrimaryContactIcon />}
        </Box>
      );
    },
    [routes]
  );

  const renderActionMenuCell = (info: CellContext<ProjectUser, unknown>) => {
    const {
      primary_contact,
      registry: { id: registryId },
    } = info.row.original;

    return (
      <ActionMenu>
        <ActionMenuItem
          onClick={() => {
            showDeleteConfirm({
              projectId: project.id,
              registryId,
            });
          }}>
          {tApplication("removeUserFromProject")}
        </ActionMenuItem>
        <ActionMenuItem
          onClick={async () => {
            await makePrimaryContactAsync({
              projectId: project.id,
              registryId,
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
      accessorKey: "affiliation.organisation",
      header: tApplication("organisationName"),
      cell: info => renderOrganisationsNameCell(info.getValue()),
    },
    ...(variant !== EntityType.USER
      ? [
          {
            accessorKey: "registry.user.status",
            header: tApplication("status"),
            cell: renderStatus,
          },
          {
            header: tApplication("actions"),
            cell: renderActionMenuCell,
          },
        ]
      : []),
  ];

  return (
    <PageBody heading={t("safePeople")}>
      <PageSection>
        <Box component="form" role="search">
          <SearchBar
            onClear={resetQueryParams}
            onSearch={(text: string) => {
              updateQueryParams({
                "name[]": text,
                "email[]": text,
              });
            }}
            placeholder={t("searchPlaceholder")}>
            {variant !== EntityType.USER && (
              <>
                <SearchActionMenu
                  actions={filterActions}
                  startIcon={<FilterIcon />}
                  renderedSelectedLabel={tApplication("filteredBy")}
                  renderedDefaultLabel={tApplication("filterByUserStatus")}
                  aria-label={tApplication("filterBy")}
                  multiple
                />

                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  {variant === EntityType.CUSTODIAN && (
                    <Button
                      variant="outlined"
                      startIcon={<ListIcon />}
                      onClick={() => {
                        setShowListView(!showListView);
                      }}>
                      {!showListView
                        ? "Switch to list view"
                        : "Switch to board view"}
                    </Button>
                  )}
                  <Button
                    startIcon={<Add />}
                    onClick={() => {
                      setShowAddModal(true);
                    }}>
                    {variant === EntityType.ORGANISATION
                      ? t("requestAddNewMemberButton")
                      : t("addNewMemberButton")}
                  </Button>
                </Grid>
              </>
            )}
          </SearchBar>
        </Box>
      </PageSection>
      <PageSection>
        <ProjectsAddUserModal
          request={variant === EntityType.ORGANISATION}
          projectId={project.id}
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
        {showListView ? (
          <ProjectsSafePeopleBoard />
        ) : (
          <Table
            total={total}
            last_page={last_page}
            setPage={setPage}
            data={projectUsers}
            columns={columns}
            queryState={queryState}
            isPaginated
          />
        )}
      </PageSection>
    </PageBody>
  );
}
