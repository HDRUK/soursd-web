import ContactLink from "@/components/ContactLink";
import Icon from "@/components/Icon";
import Pagination from "@/components/Pagination";
import Results from "@/components/Results";
import ResultsCard from "@/components/ResultsCard";
import UserRegisteredStatus from "@/components/UserRegisteredStatus";
import { useStore } from "@/data/store";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { PageBody, PageSection } from "@/modules";
import SearchBar from "@/modules/SearchBar";
import { getOrganisationRegistries } from "@/services/organisations";
import { formatShortDate } from "@/utils/date";
import { isRegistered } from "@/utils/user";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { SearchDirections } from "@/consts/search";
import DecoupleUser from "../Delegates/DecoupleDelegate";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import UserModal from "../UserModal";
import UserBulkInvite from "../UserBulkInvite";
import { User } from "@/types/application";
import Table from "@/modules/Table";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [open, setOpen] = useState(false);
  const organisation = useStore(state => state.config.organisation);

  const {
    isError: isGetUsersError,
    isLoading: isGetUsersLoading,
    data: usersData,
    refetch: refetchOrganisationUsers,
    last_page,
    page,
    setPage,
    updateQueryParam,
  } = usePaginatedQuery({
    queryKeyBase: ["getOrganisationRegistries", organisation?.id],
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
    },
    queryFn: queryParams => {
      return getOrganisationRegistries(organisation?.id, queryParams, {
        error: {
          message: "getUsersError",
        },
      });
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

  const renderActions = (info: CellContext<User, unknown>) => <></>;

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: <Checkbox value={true} />,
      cell: info => <Checkbox value={true} />,
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
      <PageSection heading="Employee or student administration">
        <Box sx={{ marginBottom: "30px" }}>
          {t("manageResearchersDescription")}
        </Box>
        <Box sx={{ display: "flex", gap: 1, mb: 3, alignItems: "center" }}>
          <Box component="form" role="search" sx={{ flexGrow: 1 }}>
            <SearchBar
              fullWidth={false}
              onSearch={text => updateQueryParam("first_name[]", text)}
            />
          </Box>
        </Box>

        <Table
          isPaginated
          page={page}
          setPage={setPage}
          last_page={last_page}
          data={usersData || []}
          columns={columns}
        />

        {/*<Results
          noResultsMessage={t("noResults")}
          errorMessage={t.rich("getError", {
            contactLink: ContactLink,
          })}
          queryState={{
            isLoading: isGetUsersLoading,
            isError: isGetUsersError,
          }}
          count={usersData?.length}>
          {usersData?.map(user => {
            const { first_name, last_name, created_at, email } = user;

            return (
              <ResultsCard
                icon={
                  <Icon size="xlarge">
                    <PersonOutlineOutlinedIcon />
                  </Icon>
                }
                content={
                  <>
                    <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                      {first_name} {last_name}
                    </Typography>
                    <Typography>{email}</Typography>
                  </>
                }
                details={
                  <>
                    <Typography color="caption.main">
                      {t("invitedOn", {
                        date: formatShortDate(created_at),
                      })}
                    </Typography>
                    <UserRegisteredStatus registered={isRegistered(user)} />
                  </>
                }
                actions={
                  <DecoupleUser
                    user={user}
                    onSuccess={refetchOrganisationUsers}
                    payload={{ organisation_id: null }}
                    namespace="DecoupleUser"
                  />
                }
              />
            );
          })}
        </Results>*/}
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
      <PageSection
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}>
        <Pagination
          isLoading={isGetUsersLoading}
          page={page}
          count={last_page}
          onChange={(e: React.ChangeEvent<unknown>, page: number) =>
            setPage(page)
          }
        />
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
