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

  const { isLoading, isError, isSuccess, ...restPaginationProps } =
    usePaginatedCustodianOrganisationUsers(custodianId, organisationId, {
      shouldUpdateQuerystring: true,
    });

  return (
    <PageBody>
      <PageSection>
        <OrganisationsPeopleTable
          {...restPaginationProps}
          queryState={{
            isLoading,
            isError,
            isSuccess,
          }}
          t={t}
        />
      </PageSection>
    </PageBody>
  );
}
