"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Details from "../Details";
import Users from "../Users";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  if (!organisation || !user) notFound();

  return (
    <>
      {tabId === PageTabs.USERS && <Users />}
      {tabId === PageTabs.DETAILS && <Details />}
      {tabId === PageTabs.TASKS && "Tasks"}
      {tabId === PageTabs.PROJECTS && "Projects"}
    </>
  );
}
