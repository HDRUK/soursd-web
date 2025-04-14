"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import UserAffiliations from "../UserAffiliations";
import UserCustodianOrgInfo from "../UserCustodianOrgInfo";
import UserHistory from "../UserHistory";
import UserIdentity from "../UserIdentity";
import UserProjects from "../UserProjects";
import UserTrainingAccreditations from "../UserTrainingAccreditations";
import { UserSubTabs } from "../../const/tabs";

interface TabsContentsProps {
  userId: number;
  subTabId: UserSubTabs;
}

export default function SubTabsContents({
  userId,
  subTabId,
}: TabsContentsProps) {
  const custodian = useStore(state => state.getCustodian());

  const availableSubTabs = Object.values(UserSubTabs) || [];

  if (!custodian || !availableSubTabs.includes(subTabId)) {
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
      content = <UserAffiliations userId={userId} />;
      break;
    default:
      content = null;
  }

  return content;
}
