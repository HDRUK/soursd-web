"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import Projects from "@/modules/Projects";
import { PageTabs } from "../../consts/tabs";
import Delegates from "../Delegates";
import Users from "../Users/Users";

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
      {tabId === PageTabs.MANAGE_DELEGATES && <Delegates />}
      {tabId === PageTabs.MANAGE_USERS && <Users />}
      {tabId === PageTabs.PROJECTS && <Projects variant="organisation" />}
    </>
  );
}
