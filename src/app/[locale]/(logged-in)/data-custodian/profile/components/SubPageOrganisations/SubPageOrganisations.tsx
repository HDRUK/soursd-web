import { useStore } from "@/data/store";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { Organisation } from "@/types/application";
import { useEffect } from "react";
import { PageTabs, OrganisationsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  organisationData: Organisation;
  params: {
    subTabId: OrganisationsSubTabs;
    id?: number;
  };
}

export default function SubPageOrganisations({
  params,
  organisationData,
}: PageProps) {
  const tabId = PageTabs.ORGANISATIONS;

  const [organisation, setOrganisation] = useStore(state => [
    state.getCurrentOrganisation(),
    state.setCurrentOrganisation,
  ]);

  useEffect(() => {
    setOrganisation(organisationData);
  }, [organisationData]);

  return (
    organisation && (
      <PageBodyContainer heading={organisation.organisation_name}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <SubTabsSections id={organisation.id} tabId={tabId} {...params} />
            <SubTabsContents tabId={tabId} {...params} />
          </PageColumnBody>
          <PageColumnDetails lg={4}>Validation panels here</PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}
