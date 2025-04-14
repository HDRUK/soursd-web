"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { getOrganisationQuery } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageOrganisations from "../../../components/SubPageOrganisations";
import { OrganisationsSubTabs } from "../../../consts/tabs";

interface OrganisationsPageProps {
  params: {
    subTabId: OrganisationsSubTabs;
    id: number;
  };
}

function OrganisationsPage({
  params: { subTabId, id },
}: OrganisationsPageProps) {
  const {
    data: organisation,
    isPending,
    isFetched,
  } = useQuery(getOrganisationQuery(id));

  if (!organisation?.data && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isPending}>
      {organisation?.data && (
        <SubPageOrganisations
          organisationData={organisation?.data}
          params={{
            subTabId,
            id,
          }}
        />
      )}
    </LoadingWrapper>
  );
}

export default OrganisationsPage;
