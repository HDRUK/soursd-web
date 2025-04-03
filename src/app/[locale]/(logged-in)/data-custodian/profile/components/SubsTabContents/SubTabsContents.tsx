"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import ProjectsSafePeople from "@/modules/ProjectsSafePeople";
import { EntityType } from "@/types/api";
import {
  ConfigurationSubTabs,
  getSubTabs,
  PageTabs,
  ProjectsSubTabs,
  UserSubTabs,
} from "../../consts/tabs";
import ProjectsSafeProject from "../ProjectsSafeProject";
import ProjectsSafeData from "../ProjectsSafeData";
import ProjectsSafeSettings from "../ProjectsSafeSettings";
import Rules from "../Rules";
import UserAffiliations from "../UserAffiliations";
import UserCustodianOrgInfo from "../UserCustodianOrgInfo";
import UserHistory from "../UserHistory";
import UserIdentity from "../UserIdentity";
import UserProjects from "../UserProjects";
import UserTrainingAccreditations from "../UserTrainingAccreditations";
import ValidationChecks from "../ValidationChecks";
import Integrations from "../Integrations";
import Webhooks from "../Webhooks";
import ProjectsSafeOutputs from "../ProjectsSafeOutputs";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId: ConfigurationSubTabs | UserSubTabs | ProjectsSubTabs;
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
    default:
      content = null;
  }

  return content;
}
