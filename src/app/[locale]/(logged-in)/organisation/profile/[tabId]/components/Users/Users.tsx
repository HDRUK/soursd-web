import ContactLink from "@/components/ContactLink";
import Icon from "@/components/Icon";
import Results from "@/components/Results";
import ResultsCard from "@/components/ResultsCard";
import UserRegisteredStatus from "@/components/UserRegisteredStatus";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance, PageSection } from "@/modules";
import SearchBar from "@/modules/SearchBar";
import { formatShortDate } from "@/utils/date";
import { isRegistered } from "@/utils/user";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { getOrganisationUsers } from "@/services/organisations";
import Pagination from "@/components/Pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import UserModal from "../UserModal";
import DecoupleUser from "../DecoupleUser";

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
  } = usePaginatedQuery({
    queryKeyBase: ["getOrganisationUsers", organisation?.id],
    queryFn: queryParams => {
      return getOrganisationUsers(organisation?.id, queryParams, {
        error: {
          message: "getUsersError",
        },
      });
    },
    enabled: !!organisation,
  });

  return (
    <PageGuidance
      title={t("manageUsers")}
      {...mockedPersonalDetailsGuidanceProps}>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <Box component="form" role="search" sx={{ flexGrow: 1 }}>
          <SearchBar onSearch={() => {}} />
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
        }}>
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
                />
              }
            />
          );
        })}
      </Results>
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
    </PageGuidance>
  );
}
