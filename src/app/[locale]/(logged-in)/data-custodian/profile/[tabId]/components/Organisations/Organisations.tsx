"use client";

import ContactLink from "@/components/ContactLink";
import Results from "@/components/Results";
import { PageBody, PageSection } from "@/modules";
import SearchFilters from "@/modules/SearchFilters";
import {
  DeleteApprovalPayloadWithEntity,
  PostApprovalPayloadWithEntity,
} from "@/services/approvals";
import {
  getOrganisations,
  getOrganisationsQuery,
} from "@/services/organisations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutationApproval, useMutationDeleteApproval } from "../../hooks";
import OrganisationsLegend from "../OrganisationsLegend";
import OrganisationsList from "../OrganisationsList";
import { getCombinedQueryState } from "@/utils/query";
import Pagination from "@/components/Pagination";

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
  } = getOrganisationsQuery();

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
        <SearchFilters
          actions={[]}
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
          errorMessage={t.rich(t("noResultsOrganisations"), {
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
