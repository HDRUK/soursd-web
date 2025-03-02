"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import Projects from "@/modules/Projects";
import Home from "../Home";
import Users from "../Users";
import Organisations from "../Organisations";
import { PageTabs } from "../../consts/tabs";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const custodian = useStore(state => state.getCustodian());
  if (!custodian) notFound();

  return (
    <>
      {tabId === PageTabs.HOME && <Home custodian={custodian} />}
      {tabId === PageTabs.PROJECTS && <Projects variant="custodian" />}
      {tabId === PageTabs.ORGANISATIONS && <Organisations />}
      {tabId === PageTabs.USERS && <Users />}
      {tabId === PageTabs.CONTACTS && "Contacts"}
    </>
  );
}
