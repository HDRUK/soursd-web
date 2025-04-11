"use client";

import { useStore } from "@/data/store";
import Projects from "@/modules/Projects";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Contacts from "../Contacts";
import Home from "../Home";
import Organisations from "../Organisations";
import Users from "../Users";

interface TabsContentsProps {
  tabId: PageTabs;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const custodian = useStore(state => state.getCustodian());

  if (!custodian) notFound();

  return (
    <>
      {tabId === PageTabs.HOME && <Home custodian={custodian} />}
      {tabId === PageTabs.PROJECTS && <Projects variant="custodian" />}
      {tabId === PageTabs.ORGANISATIONS && <Organisations />}
      {tabId === PageTabs.USERS && <Users variant="custodian" />}
      {tabId === PageTabs.CONTACTS && <Contacts />}
    </>
  );
}
