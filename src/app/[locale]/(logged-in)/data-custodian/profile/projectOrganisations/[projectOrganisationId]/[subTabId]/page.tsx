"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { getOrganisationQuery } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import CustodianProjectOrganisation from "./components/CustodianProjectOrganisation";
import SubPageOrganisations from "../../../components/SubPageOrganisations";
import { OrganisationsSubTabs } from "../../../consts/tabs";

interface PageProps {
  params: {
    id: number;
    projectOrganisationId: number;
    subTabId: string;
  };
}

function CustodianProjectOrganisationsPage({
  params: { projectOrganisationId, subTabId },
}: PageProps) {
  return (
    <CustodianProjectOrganisation
      projectOrganisationId={projectOrganisationId}
      subTabId={subTabId}
    />
  );
}

/*
function OrganisationsPage({
  params: { subTabId, id },
}: OrganisationsPageProps) {
  const {
    data: organisation,
    isPending,
    isFetched,
  } = useQuery(getOrganisationQuery(id));

  console.log(organisation?.data);

  return <b> yo </b>;

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
*/
export default CustodianProjectOrganisationsPage;
