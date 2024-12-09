"use client";

import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import PageSection from "@/modules/PageSection";
import { getOrganisationProjects } from "@/services/projects";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import StatusIndicator from "@/components/StatusIndicator";
import Pagination from "@/components/Pagination";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import SearchBar from "@/components/SearchBar";
import { useCallback, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useStore } from "@/data/store";
import ProjectList from "../ProjectList";

const NAMESPACE_TRANSLATIONS_PROJECT_LIST = "ProjectList";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROJECT_LIST);
  const router = useRouter();
  const pathname = usePathname();
  const organisation = useStore(store => store.getOrganisation());
  const { id: organisationId } = organisation || {};

  const searchParams = useSearchParams();
  const searchTitle = searchParams?.get("title");

  const [queryParams, setQueryParams] = useState<{}>({
    "title[]": searchTitle,
  });

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    last_page,
    page,
    setPage,
  } = usePaginatedQuery({
    queryKeyBase: ["getOrganisationProjects", queryParams],
    queryFn: page =>
      getOrganisationProjects(
        organisationId,
        { page, ...queryParams },
        {
          error: {
            message: "getOrganisationProjects",
          },
        }
      ),
    enabled: !!organisationId,
  });

  const updatePath = useCallback(
    (key: string, value: string) => {
      router.push(`${pathname}?${updateQueryString(key, value)}`, {
        scroll: false,
      });
      setPage(1);
      setQueryParams({
        ...queryParams,
        [`${key}[]`]: value,
      });
    },
    [pathname, router, updateQueryString]
  );

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
          <SearchBar
            onSearch={title => updatePath("title", title)}
            placeholder={t("searchPlaceholder")}
          />
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
            {t("getOrganisationProjectsError")}
          </Message>
        )}
        {!isProjectsLoading && projectsData && (
          <ProjectList projects={projectsData} />
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
