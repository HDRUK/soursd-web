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
import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { SearchDirections } from "@/consts/search";
import DecoupleUser from "../Delegates/DecoupleDelegate";
import UserModal from "../UserModal";
import UserBulkInvite from "../UserBulkInvite";

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

  return (
    <PageBody>
      {organisation && (
        <PageSection heading="Add new affiliated employees or students">
          <UserBulkInvite organisation_id={organisation.id} />
        </PageSection>
      )}
      <PageSection heading="Manage affiliated employees or students">
        <Box sx={{ marginBottom: "30px" }}>
          {t("manageResearchersDescription")}
        </Box>
        <Box sx={{ display: "flex", gap: 1, mb: 3, alignItems: "center" }}>
          <Box component="form" role="search" sx={{ flexGrow: 1 }}>
            <SearchBar
              onSearch={text => updateQueryParam("first_name[]", text)}
            />
          </Box>
          <div>
            <Button
              aria-label="modal-button"
              endIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={() => setOpen(true)}>
              {t("inviteNewUserButton")}
            </Button>
          </div>
        </Box>
        <Results
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
        </Results>
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
