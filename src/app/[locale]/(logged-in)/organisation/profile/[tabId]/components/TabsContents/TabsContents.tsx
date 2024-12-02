"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Users from "../Users";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const organisation = useStore(state => state.getOrganisation());

  if (!organisation) notFound();

  return (
    <>
      {tabId === PageTabs.USER && "User"}
      {tabId === PageTabs.DETAILS && "Details"}
      {tabId === PageTabs.CONTACTS && "Contacts"}
      {tabId === PageTabs.USERS && <Users />}
    </>
  );
}
