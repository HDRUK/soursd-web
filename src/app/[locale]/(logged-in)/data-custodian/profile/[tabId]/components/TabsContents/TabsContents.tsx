"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Details from "../Details";
import Users from "../Users";
import Projects from "../Projects";
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
      {tabId === PageTabs.PROJECTS && <Projects />}
      {tabId === PageTabs.ORGANISATIONS && <Organisations />}
      {tabId === PageTabs.USERS && <Users />}
      {tabId === PageTabs.KEYCARDS && "Keycards"}
      {tabId === PageTabs.CONFIGURATION && "Configuration"}
    </>
  );
}
