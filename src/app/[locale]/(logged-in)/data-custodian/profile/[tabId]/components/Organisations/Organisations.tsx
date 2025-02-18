"use client";

import ContactLink from "@/components/ContactLink";
import Pagination from "@/components/Pagination";
import Results from "@/components/Results";
import { SearchDirections } from "@/consts/search";
import { PageBody, PageSection } from "@/modules";
import SearchBar from "@/modules/SearchBar";
import {
  DeleteApprovalPayloadWithEntity,
  PostApprovalPayloadWithEntity,
} from "@/services/approvals";
import { useOrganisationsQuery } from "@/services/organisations";
import { getCombinedQueryState, getSearchSortOrder } from "@/utils/query";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutationApproval, useMutationDeleteApproval } from "../../hooks";
import OrganisationsLegend from "../OrganisationsLegend";
import OrganisationsList from "../OrganisationsList";

const NAMESPACE_TRANSLATIONS_USERS = "OrganisationsList";

export default function Sections() {
  const queryClient = useQueryClient();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS);

  const {
    data,
    page,
    setPage,
    updateQueryParam,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    ...queryState
  } = useOrganisationsQuery();

  const { mutateAsync: mutateUpdateAsync, ...approvingQueryState } =
    useMutationApproval();

  const { mutateAsync: mutateDeleteAsync, ...deleteQueryState } =
    useMutationDeleteApproval();

  const handleApprove = useCallback(
    async (payload: PostApprovalPayloadWithEntity) => {
      await mutateUpdateAsync(payload);

      queryClient.refetchQueries({
        queryKey: ["getOrganisations"],
      });
    },
    []
  );

  const handleUnapprove = useCallback(
    async (payload: DeleteApprovalPayloadWithEntity) => {
      await mutateDeleteAsync(payload);

      queryClient.refetchQueries({
        queryKey: ["getOrganisations"],
      });
    },
    []
  );

  const sortDirection = getSearchSortOrder(queryParams);

  const searchActions = [
    {
      label: t("sortActions.AZ"),
      onClick: () =>
        handleSortToggle("organisation_name", SearchDirections.ASC),
      checked: sortDirection === SearchDirections.ASC,
    },
    {
      label: t("sortActions.ZA"),
      onClick: () =>
        handleSortToggle("organisation_name", SearchDirections.DESC),
      checked: sortDirection === SearchDirections.DESC,
    },
    {
      label: t("sortActions.hasDelegates"),
      onClick: () => handleFieldToggle("has_delegates", ["1", ""]),
      checked: queryParams.approved === "1",
    },
  ];

  const pagination = (
    <Pagination
      page={page}
      count={queryState.last_page}
      onChange={(_, page: number) => setPage(page)}
    />
  );

  return (
    <PageBody>
      <PageSection>
        <SearchBar
          actions={searchActions}
          updateQueryParam={(text: string) =>
            updateQueryParam("organisation_name[]", text)
          }
          placeholder={t("searchPlaceholder")}
          legend={<OrganisationsLegend />}
        />
      </PageSection>
      <PageSection>
        <Results
          queryState={queryState}
          noResultsMessage={t("noResultsOrganisations")}
          pagination={pagination}
          errorMessage={t.rich("errorResultsOrganisations", {
            contactLink: ContactLink,
          })}
          count={queryState.total}>
          <OrganisationsList
            onApprove={handleApprove}
            onUnapprove={handleUnapprove}
            organisations={data}
            queryState={getCombinedQueryState([
              approvingQueryState,
              deleteQueryState,
            ])}
          />
        </Results>
      </PageSection>
    </PageBody>
  );
}
