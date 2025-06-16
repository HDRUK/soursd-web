"use client";

import { useStore } from "@/data/store";
import {
  OrganisationsFilters,
  PageBody,
  PageBodyContainer,
  PageSection,
} from "@/modules";
import { OrganisationsProjectsTable } from "@/organisms";
import { usePaginatedCustodianOrganisations } from "@/services/custodians";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export default function Organisations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const custodianId = useStore(state => state.getCustodian().id);

  const {
    data,
    page,
    total,
    last_page,
    setPage,
    updateQueryParams,
    resetQueryParams,
    handleSortToggle,
    handleFieldToggle,
    queryParams,
    isLoading,
    isError,
    isSuccess,
  } = usePaginatedCustodianOrganisations(custodianId, {
    shouldUpdateQuerystring: true,
  });

  console.log("HELLO", data);

  return (
    <PageBodyContainer heading={tProfile("organisations")}>
      <PageBody>
        <PageSection>
          <OrganisationsFilters
            queryParams={queryParams}
            updateQueryParams={updateQueryParams}
            resetQueryParams={resetQueryParams}
            handleSortToggle={handleSortToggle}
            handleFieldToggle={handleFieldToggle}
          />
        </PageSection>
        <PageSection>
          <OrganisationsProjectsTable
            data={data}
            total={total}
            last_page={last_page}
            page={page}
            setPage={setPage}
            queryState={{
              isLoading,
              isError,
              isSuccess,
            }}
            isPaginated
          />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
