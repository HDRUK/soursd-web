"use client";

import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getIssuerProjects } from "@/services/projects";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ISSUER_ID } from "@/consts/application";
import StatusIndicator from "@/components/StatusIndicator";
import Pagination from "@/components/Pagination";
import ProjectList from "../ProjectList";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_LIST);
  const [page, setPage] = useState(1); // Current page

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useQuery({
    placeholderData: keepPreviousData,
    queryKey: ["getIssuerProjects", page],
    queryFn: () =>
      getIssuerProjects(ISSUER_ID, page, {
        // note: ISSUER_ID - need to update this as hard coded as 1!
        error: {
          message: "getIssuerProjects",
        },
      }),
  });

  const { last_page } = projectsData?.data || {};

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
            {t("getIssuerProjectsError")}
          </Message>
        )}
        {!isProjectsLoading && projectsData?.data.data && (
          <ProjectList projects={projectsData?.data.data} />
        )}
      </PageSection>
      <PageSection
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}>
        <Pagination
          isLoading={isProjectsLoading}
          page={page}
          count={last_page}
          onChange={(e: React.ChangeEvent<unknown>, page: number) =>
            setPage(page)
          }
        />
      </PageSection>
    </>
  );
}
