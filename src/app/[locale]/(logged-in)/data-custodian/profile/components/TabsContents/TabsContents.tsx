"use client";

import Projects from "@/modules/Projects";
import { notFound } from "next/navigation";
import useCustodianStore from "@/queries/useCustodianStore";
import { PageTabs } from "../../consts/tabs";
import Contacts from "../Contacts";
import Home from "../Home";
import Organisations from "../Organisations";
import Users from "../Users";

interface TabsContentsProps {
  tabId: PageTabs;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const custodian = useCustodianStore();

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
