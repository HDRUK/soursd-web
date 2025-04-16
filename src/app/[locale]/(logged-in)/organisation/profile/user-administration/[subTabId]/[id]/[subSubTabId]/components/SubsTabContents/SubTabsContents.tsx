"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import UserAffiliations from "../../../../../../components/UserAffiliations";
import UserCustodianOrgInfo from "../../../../../../components/UserCustodianOrgInfo";
import UserHistory from "../../../../../../components/UserHistory";
import UserIdentity from "../../../../../../components/UserIdentity";
import UserProjects from "../../../../../../components/UserProjects";
import UserTrainingAccreditations from "../../../../../../components/UserTrainingAccreditations";
import { UserSubTabs } from "../../../../../../consts/tabs";

interface TabsContentsProps {
  subTabId: UserSubTabs;
}

export default function SubTabsContents({ subTabId }: TabsContentsProps) {
  console.log('Org profile subsub SubTabsContents', subTabId);
  // const custodian = useStore(state => state.getCustodian());

  const availableSubTabs = Object.values(UserSubTabs) || [];

  if (!availableSubTabs.includes(subTabId)) {
    console.log('not found here');
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
  console.log('content', content?.key);
  return content;
}
