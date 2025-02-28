"use client";

import { useStore } from "@/data/store";
import Projects from "@/modules/Projects";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Home from "../Home";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  if (!user || !organisation) notFound();

  return (
    <>
      {tabId === PageTabs.HOME && <Home />}
      {tabId === PageTabs.PROJECTS && <Projects variant="organisation" />}
    </>
  );
}
