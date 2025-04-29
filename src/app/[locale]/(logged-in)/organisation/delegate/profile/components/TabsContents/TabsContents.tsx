"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import Users from "@/modules/OrganisationUsers";
import { PageTabs } from "../../consts/tabs";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  if (!user || !organisation) notFound();

  return tabId === PageTabs.HOME && <Users />;
}
