import { useStore } from "@/data/store";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/material";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import Table from "../../components/Table";
import Text from "../../components/Text";
import { TrashIcon } from "../../consts/icons";
import { SearchDirections } from "../../consts/search";
import usePaginatedQuery from "../../hooks/usePaginatedQuery";
import { PageBody, PageSection } from "../../modules";
import OrganisationUsersBulkInvite from "../OrganisationUsersBulkInvite";
import OrganisationUsersFilters from "../../modules/OrganisationUsersFilters";
import useMutationWithConfirmation from "../../queries/useMutationWithConfirmation";
import { deleteAffiliationQuery } from "../../services/affiliations";
import { getOrganisationRegistriesQuery } from "../../services/organisations";
import { User } from "../../types/application";
import { renderUserNameCell } from "../../utils/cells";
import { formatShortDate } from "../../utils/date";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function OrganisationUsers() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { organisation, routes } = useStore(state => ({
    organisation: state.config.organisation,
    routes: state.getApplication().routes,
  }));

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
    },
    enabled: !!organisation,
    shouldUpdateQuerystring: true,
  });

  const { showConfirm } = useMutationWithConfirmation(
    deleteAffiliationQuery(),
    {
      successAlertProps: {
        willClose: () => {
          refetchOrganisationUsers();
        },
      },
    }
  );

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
      <ActionMenuItem
        onClick={() =>
          showConfirm(info.row.original.registry.affiliations[0].id)
        }>
        <Text startIcon={<TrashIcon />}>{t("removeAffiliationButton")}</Text>
      </ActionMenuItem>
    </ActionMenu>
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Employee / Student name",
      cell: info => {
        return renderUserNameCell(
          info.row.original,
          routes.profileOrganisationUsersIdentity?.path,
          {
            userId: info.row.original.id,
          }
        );
      },
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
        <OrganisationUsersFilters
          updateQueryParams={updateQueryParams}
          resetQueryParams={resetQueryParams}
        />
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
        <OrganisationUsersBulkInvite organisation={organisation} />
      </PageSection>
    </PageBody>
  );
}
