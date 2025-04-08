"use client";

import { useStore } from "@/data/store";
import ProjectsSafePeople from "@/modules/ProjectsSafePeople";
import { EntityType } from "@/types/api";
import { notFound } from "next/navigation";
import {
  ConfigurationSubTabs,
  getSubTabs,
  OrganisationsSubTabs,
  PageTabs,
  ProjectsSubTabs,
  UserSubTabs,
} from "../../consts/tabs";
import Integrations from "../Integrations";
import OrganisationsDataSecurityCompliance from "../OrganisationsDataSecurityCompliance";
import OrganisationsDigitalIdentifiers from "../OrganisationsDigitalIdentifiers";
import OrganisationsNameAddress from "../OrganisationsNameAddress";
import OrganisationsPeople from "../OrganisationsPeople";
import OrganisationsSectorWebsite from "../OrganisationsSectorWebsite";
import OrganisationsSubsidiaries from "../OrganisationsSubsidiaries";
import ProjectsSafeData from "../ProjectsSafeData";
import ProjectsSafeOutputs from "../ProjectsSafeOutputs";
import ProjectsSafeProject from "../ProjectsSafeProject";
import ProjectsSafeSettings from "../ProjectsSafeSettings";
import Rules from "../Rules";
import UserAffiliations from "../UserAffiliations";
import UserCustodianOrgInfo from "../UserCustodianOrgInfo";
import UserHistory from "../UserHistory";
import UserIdentity from "../UserIdentity";
import UserProjects from "../UserProjects";
import UserTrainingAccreditations from "../UserTrainingAccreditations";
import ValidationChecks from "../ValidationChecks";
import Webhooks from "../Webhooks";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId:
    | ConfigurationSubTabs
    | UserSubTabs
    | ProjectsSubTabs
    | OrganisationsSubTabs;
  id?: number;
}

export default function SubTabsContents({
  tabId,
  subTabId,
}: TabsContentsProps) {
  const [user, custodian] = useStore(state => [
    state.getUser(),
    state.getCustodian(),
  ]);

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (!user || !custodian || !availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
    case ConfigurationSubTabs.RULES:
      content = <Rules />;
      break;
    case ConfigurationSubTabs.VALIDATION_CHECKS:
      content = <ValidationChecks />;
      break;
    case ConfigurationSubTabs.WEBHOOKS:
      content = <Webhooks />;
      break;
    case ConfigurationSubTabs.INTEGRATIONS:
      content = <Integrations />;
      break;
    case UserSubTabs.HISTORY:
      content = <UserHistory />;
      break;
    case UserSubTabs.IDENTITY:
      content = <UserIdentity />;
      break;
    case UserSubTabs.TRAINING_ACCREDITATIONS:
      content = <UserTrainingAccreditations />;
      break;
    case UserSubTabs.PROJECTS:
      content = <UserProjects />;
      break;
    case UserSubTabs.CUSTODIAN_ORG_INFO:
      content = <UserCustodianOrgInfo />;
      break;
    case UserSubTabs.AFFILIATIONS:
      content = <UserAffiliations />;
      break;
    case ProjectsSubTabs.SAFE_PEOPLE:
      content = <ProjectsSafePeople variant={EntityType.CUSTODIAN} />;
      break;
    case ProjectsSubTabs.SAFE_DATA:
      content = <ProjectsSafeData />;
      break;
    case ProjectsSubTabs.SAFE_PROJECT:
      content = <ProjectsSafeProject />;
      break;
    case ProjectsSubTabs.SAFE_SETTINGS:
      content = <ProjectsSafeSettings />;
      break;
    case ProjectsSubTabs.SAFE_OUTPUTS:
      content = <ProjectsSafeOutputs />;
      break;
    case OrganisationsSubTabs.PEOPLE:
      content = <OrganisationsPeople />;
      break;
    case OrganisationsSubTabs.NAME_ADDRESS:
      content = <OrganisationsNameAddress />;
      break;
    case OrganisationsSubTabs.DIGITAL_IDENTIFIERS:
      content = <OrganisationsDigitalIdentifiers />;
      break;
    case OrganisationsSubTabs.SECTOR_WEBSITE:
      content = <OrganisationsSectorWebsite />;
      break;
    case OrganisationsSubTabs.SUBSIDIARIES:
      content = <OrganisationsSubsidiaries />;
      break;
    case OrganisationsSubTabs.DATA_SECURITY:
      content = <OrganisationsDataSecurityCompliance />;
      break;
    default:
      content = null;
  }

  return content;
}
