"use client";

import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { notFound } from "next/navigation";
import {
  getSubTabs,
  ConfigurationSubTabs,
  PageTabs,
  UserSubTabs,
  ProjectsSubTabs,
} from "../../consts/tabs";
import Rules from "../Rules";
import ValidationChecks from "../ValidationChecks";
import Webhooks from "../Webhooks";
import UserHistory from "../UserHistory";
import UserIdentity from "../UserIdentity";
import UserTrainingAccreditations from "../UserTrainingAccreditations";
import UserProjects from "../UserProjects";
import UserCustodianOrgInfo from "../UserCustodianOrgInfo";
import UserAffiliations from "../UserAffiliations";
import ProjectsSafePeople from "../ProjectsSafePeople";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId: ConfigurationSubTabs | UserSubTabs | ProjectsSubTabs;
  id?: number;
}

export default function SubTabsContents({
  tabId,
  subTabId,
  id,
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
      content = <ProjectsSafePeople id={id} />;
      break;
    default:
      content = null;
  }

  return <PageBody>{content}</PageBody>;
}
