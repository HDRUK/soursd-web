"use client";

import { notFound } from "next/navigation";
import UserAffiliations from "@/modules/UserAffiliations";
import UserHistory from "@/modules/UserHistory";
import UserIdentity from "@/modules/UserIdentity";
import UserCustodianOrgInfo from "../../../../../../components/UserCustodianOrgInfo";
import UserProjects from "../../../../../../components/UserProjects";
import UserTrainingAccreditations from "../../../../../../components/UserTrainingAccreditations";
import { UserSubTabs } from "../../../../../../consts/tabs";

interface TabsContentsProps {
  subTabId: UserSubTabs;
}

export default function SubTabsContents({ subTabId }: TabsContentsProps) {
  const availableSubTabs = Object.values(UserSubTabs) || [];

  if (!availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
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
    default:
      content = null;
  }

  return content;
}
