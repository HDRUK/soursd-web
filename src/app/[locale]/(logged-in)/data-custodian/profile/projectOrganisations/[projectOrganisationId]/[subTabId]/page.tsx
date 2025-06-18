"use client";

import CustodianProjectOrganisation from "./components/CustodianProjectOrganisation";

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

export default CustodianProjectOrganisationsPage;
