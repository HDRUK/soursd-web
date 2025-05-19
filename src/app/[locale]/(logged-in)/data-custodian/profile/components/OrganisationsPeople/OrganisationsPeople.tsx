"use client";

import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { OrganisationsPeopleTable } from "@/organisms";
import { usePaginatedCustodianOrganisationUsers } from "@/services/custodians";

export default function OrganisationsPeople() {
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
        />
      </PageSection>
    </PageBody>
  );
}
