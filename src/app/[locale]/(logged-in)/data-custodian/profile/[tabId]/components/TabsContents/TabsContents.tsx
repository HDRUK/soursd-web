"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import Projects from "@/modules/Projects";
import { PageTabs } from "../../consts/tabs";
import Details from "../Details";
import Users from "../Users";
import Organisations from "../Organisations";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const custodian = useStore(state => state.getCustodian());

  if (!custodian) notFound();

  return (
    <>
      {tabId === PageTabs.DETAILS && <Details custodian={custodian} />}
      {tabId === PageTabs.PROJECTS && <Projects variant="organisation" />}
      {tabId === PageTabs.ORGANISATIONS && <Organisations />}
      {tabId === PageTabs.USERS && <Users />}
      {tabId === PageTabs.KEYCARDS && "Keycards"}
      {tabId === PageTabs.CONFIGURATION && "Configuration"}
    </>
  );
}
