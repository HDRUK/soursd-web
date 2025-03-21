"use client";

import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { notFound } from "next/navigation";
import {
  ConfigurationSubTabs,
  getSubTabs,
  PageTabs,
  ProjectsSubTabs,
  UserSubTabs,
} from "../../consts/tabs";
import ProjectsSafePeople from "../ProjectsSafePeople";
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
import { ReactNode } from "react";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId: ConfigurationSubTabs | UserSubTabs | ProjectsSubTabs;
  id?: number;
  heading?: ReactNode;
}

export default function SubTabsContents({
  tabId,
  subTabId,
  id,
  heading,
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
    case ProjectsSubTabs.SAFE_PROJECT:
      content = <ProjectsSafeProject />;
      break;
    case ProjectsSubTabs.SAFE_SETTINGS:
      content = <ProjectsSafeSettings id={id} />;
      break;
    default:
      content = null;
  }

  return <PageBody heading={heading}>{content}</PageBody>;
}
