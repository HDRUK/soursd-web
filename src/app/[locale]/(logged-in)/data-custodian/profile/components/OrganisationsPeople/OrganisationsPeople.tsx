"use client";

import { useStore } from "@/data/store";
import { OrganisationsPeopleTable, PageBody, PageSection } from "@/modules";
import { usePaginatedCustodianOrganisationUsers } from "@/services/custodians";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Organisations.People";

export default function OrganisationsPeople() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { custodianId, organisationId } = useStore(state => ({
    custodianId: state.getCustodian().id,
    organisationId: state.getCurrentOrganisation().id,
  }));

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
  } = usePaginatedCustodianOrganisationUsers(custodianId, organisationId, {
    shouldUpdateQuerystring: true,
  });

  return (
    <PageBody>
      <PageSection>
        <OrganisationsPeopleTable
          data={data}
          total={total}
          last_page={last_page}
          page={page}
          setPage={setPage}
          updateQueryParams={updateQueryParams}
          resetQueryParams={resetQueryParams}
          handleSortToggle={handleSortToggle}
          handleFieldToggle={handleFieldToggle}
          queryParams={queryParams}
          queryState={{
            isLoading,
            isError,
            isSuccess,
          }}
          isPaginated
          t={t}
        />
      </PageSection>
    </PageBody>
  );
}
