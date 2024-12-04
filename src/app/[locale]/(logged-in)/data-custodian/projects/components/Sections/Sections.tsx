"use client";

import ContactLink from "@/components/ContactLink";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getIssuerProjects } from "@/services/projects";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { ISSUER_ID } from "@/consts/application";
import ProjectList from "../ProjectList";
import StatusIndicator from "@/components/StatusIndicator";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_LIST);

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useQuery({
    queryKey: ["getIssuerProjects"],
    queryFn: () =>
      getIssuerProjects(ISSUER_ID, {
        error: {
          message: "getIssuerProjects",
        },
      }),
  });

  return (
    <>
      {isProjectsLoading && (
        <OverlayCenter variant="contained">
          <CircularProgress aria-label={t("loadingAriaLabel")} />
        </OverlayCenter>
      )}
      <PageSection sx={{ display: "flex" }}>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection
        sx={{
          display: "flex",
          gap: 2,
        }}>
        <PageSection sx={{ display: "flex", flex: 1 }}>
          {" "}
          Search bar to go here...{" "}
        </PageSection>
        <PageSection sx={{ display: "flex", flex: 1, gap: 2 }}>
          <StatusIndicator
            variant="success"
            size="large"
            label={t("approvedKey")}
          />
          <StatusIndicator
            variant="error"
            size="large"
            label={t("unapprovedKey")}
          />
        </PageSection>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        {isProjectsError && (
          <Message severity="error" sx={{ mb: 3 }}>
            {t.rich(`${projectsError}`, {
              contactLink: ContactLink,
            })}
          </Message>
        )}
        {!isProjectsLoading && projectsData?.data.data && (
          <ProjectList projects={projectsData?.data.data} />
        )}
      </PageSection>
    </>
  );
}
