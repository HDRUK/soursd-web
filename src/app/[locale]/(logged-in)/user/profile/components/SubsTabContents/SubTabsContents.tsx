"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { getSubTabs, PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import ProjectsSafeData from "../ProjectsSafeData";
import ProjectsSafeOutputs from "../ProjectsSafeOutputs";
import ProjectsSafePeople from "../ProjectsSafePeople";
import ProjectsSafeSettings from "../ProjectsSafeSettings";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId: ProjectsSubTabs;
  id?: number;
}

export default function SubTabsContents({
  tabId,
  subTabId,
  id,
}: TabsContentsProps) {
  const user = useStore(state => state.getUser());

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (!user || !availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
    case ProjectsSubTabs.SAFE_PEOPLE:
      content = <ProjectsSafePeople id={id} />;
      break;
    case ProjectsSubTabs.SAFE_SETTINGS:
      content = <ProjectsSafeSettings />;
      break;
    case ProjectsSubTabs.SAFE_OUTPUTS:
      content = <ProjectsSafeOutputs />;
      break;
    case ProjectsSubTabs.SAFE_DATA:
      content = <ProjectsSafeData />;
      break;
    default:
      content = null;
  }

  return content;
}
