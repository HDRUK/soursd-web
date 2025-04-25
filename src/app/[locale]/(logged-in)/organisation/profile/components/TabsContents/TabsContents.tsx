"use client";

import { useStore } from "@/data/store";
import Projects from "../Projects";
import { notFound } from "next/navigation";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { PageTabs } from "../../consts/tabs";
import Home from "../Home";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const user = useStore(state => state.getUser());
  const organisation = useOrganisationStore();

  if (!user || !organisation) notFound();

  return (
    <>
      {tabId === PageTabs.HOME && <Home />}
      {tabId === PageTabs.PROJECTS && <Projects />}
    </>
  );
}
