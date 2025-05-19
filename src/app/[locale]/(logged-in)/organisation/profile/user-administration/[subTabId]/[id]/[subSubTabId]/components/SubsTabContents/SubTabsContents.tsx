"use client";

import { notFound } from "next/navigation";
import UserAffiliations from "@/modules/UserAffiliations";
import UserHistory from "@/modules/UserHistory";
import UserIdentity from "@/modules/UserIdentity";
import UserTrainingAccreditations from "@/modules/UserTrainingAccreditations";
import { EntityType } from "@/types/api";
import UserProjects from "../../../../../../components/UserProjects";
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
      content = (
        <UserTrainingAccreditations variant={EntityType.ORGANISATION} />
      );
      break;
    case UserSubTabs.PROJECTS:
      content = <UserProjects />;
      break;
    case UserSubTabs.AFFILIATIONS:
      content = <UserAffiliations />;
      break;
    default:
      content = null;
  }

  return content;
}
