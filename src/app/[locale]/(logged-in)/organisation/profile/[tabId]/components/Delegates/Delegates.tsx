"use client";

import { mockedManageDelegatesGuidance } from "@/mocks/data/cms";
import { PageGuidance, PageSection } from "@/modules";
import {
  getOrganisationUsers,
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { useStore } from "@/data/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import Results from "@/components/Results";
import { useTranslations } from "next-intl";
import { getCustodianUsers } from "@/services/custodian_users";
import { formatShortDate } from "@/utils/date";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Pagination,
} from "@mui/material";
import { Box } from "@mui/system";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Icon from "@/components/Icon";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import ApplicationLink from "@/components/ApplicationLink";
import ResultsCard from "@/components/ResultsCard";
import UserRegisteredStatus from "@/components/UserRegisteredStatus";
import { DecoupleIcon } from "@/consts/icons";
import { isRegistered } from "@/utils/user";
import UserModal from "../UserModal";
import usePatchOrganisation from "../../hooks/usePatchOrganisation";
import DelegatesForm, { DelegatesFormValues } from "./DelegatesForm";

const NAMESPACE_PROFILE_ORGANISATION = "ProfileOrganisation";

export default function Delegates() {
  const t = useTranslations(NAMESPACE_PROFILE_ORGANISATION);

  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });

  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit,
  } = usePatchOrganisation({
    id: organisation?.id,
    organisation,
    setOrganisation,
  });

  const {
    isError: isGetUsersError,
    isLoading: isGetUsersLoading,
    data: usersData,
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

  const delegates = usersData?.filter(user => user.is_delegate === 1);

  return (
    <PageGuidance {...mockedManageDelegatesGuidance}>
      <DelegatesForm
        onSubmit={onSubmit}
        queryState={{
          isError,
          isLoading,
          error,
        }}
      />
      <Results
        noResultsMessage={t("noResults")}
        errorMessage={t.rich("getError", {
          applicationLink: ApplicationLink,
        })}
        queryState={{
          isLoading: isGetUsersLoading,
          isError: isGetUsersError,
        }}>
        {delegates?.map(user => {
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
                <IconButton
                  size="small"
                  color="inherit"
                  aria-label="icon-button">
                  <DecoupleIcon />
                </IconButton>
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
    </PageGuidance>
  );
}
