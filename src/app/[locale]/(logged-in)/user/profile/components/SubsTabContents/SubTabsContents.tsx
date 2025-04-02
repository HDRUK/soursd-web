"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageColumns, PageColumnBody } from "@/modules";
import ProjectsSafePeople from "@/modules/ProjectsSafePeople";
import { EntityType } from "@/types/api";
import { getSubTabs, PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import ProjectsSafeProject from "../ProjectsSafeProject";

interface TabsContentsProps {
  tabId: PageTabs;
  subTabId: ProjectsSubTabs;
}

export default function SubTabsContents({
  tabId,
  subTabId,
}: TabsContentsProps) {
  const user = useStore(state => state.getUser());

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (!user || !availableSubTabs.includes(subTabId)) {
    notFound();
  }

  let content = null;

  switch (subTabId) {
    case ProjectsSubTabs.SAFE_PROJECT:
      content = <ProjectsSafeProject />;
      break;
    case ProjectsSubTabs.SAFE_PEOPLE:
      content = (
        <PageColumns>
          <PageColumnBody lg={5}>
            <ProjectsSafePeople variant={EntityType.USER} />{" "}
          </PageColumnBody>
        </PageColumns>
      );
      break;
    default:
      content = null;
  }

  return content;
}
