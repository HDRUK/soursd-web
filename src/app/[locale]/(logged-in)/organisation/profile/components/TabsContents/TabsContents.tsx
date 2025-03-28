"use client";

import { useStore } from "@/data/store";
import { PageBodyContainer } from "@/modules";
import Projects from "@/modules/Projects";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Home from "../Home";

interface TabsContentsProps {
  tabId: string;
}

const NAMESPACE_TRANSLATION = "ProfileOrganisation";

export default function TabsContents({ tabId }: TabsContentsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  console.log(user, organisation);
  if (!user || !organisation) notFound();

  return (
    <PageBodyContainer heading={t(toCamelCase(tabId))}>
      {tabId === PageTabs.HOME && <Home />}
      {tabId === PageTabs.PROJECTS && <Projects variant="organisation" />}
    </PageBodyContainer>
  );
}
