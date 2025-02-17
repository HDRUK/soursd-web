"use client";

import ContactLink from "@/components/ContactLink";
import Icon from "@/components/Icon";
import Pagination from "@/components/Pagination";
import Results from "@/components/Results";
import ResultsCard from "@/components/ResultsCard";
import UserRegisteredStatus from "@/components/UserRegisteredStatus";
import { useStore } from "@/data/store";

import { PageBody, PageSection } from "@/modules";

import { isRegistered } from "@/utils/user";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { User } from "@/types/application";
import { ColumnDef } from "@tanstack/react-table";
import EditDelegate from "./EditDelegate";
import DecoupleUser from "../DecoupleUser";
import DelegatesForm from "./InvitedDelegatesForm";
import KeyContactForm from "./KeyContactForm";

const NAMESPACE_PROFILE_ORGANISATION = "ProfileOrganisation";

export default function Delegates() {
  const t = useTranslations(NAMESPACE_PROFILE_ORGANISATION);

  return (
    <PageBody>
      <PageSection>
        <KeyContactForm />
      </PageSection>
    </PageBody>
  );

  return (
    <PageBody>
      <PageSection>
        <DelegatesForm onSuccess={refetchOrganisationUsers} />
        <Results
          noResultsMessage={t("noDelegates")}
          errorMessage={t.rich("getDelegatesError", {
            contactLink: ContactLink,
          })}
          queryState={{
            isLoading: isGetUsersLoading,
            isError: isGetUsersError,
          }}
          count={delegates?.length}>
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
                  <DecoupleUser
                    user={user}
                    onSuccess={refetchOrganisationUsers}
                    payload={{ is_delegate: 0 }}
                    namespace="DecoupleDelegate"
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
    </PageBody>
  );
}
