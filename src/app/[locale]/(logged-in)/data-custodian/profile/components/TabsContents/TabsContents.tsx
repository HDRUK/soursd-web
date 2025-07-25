"use client";

import useCustodianStore from "@/queries/useCustodianStore";
import { EntityType } from "@/types/api";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Contacts from "../Contacts";
import Home from "../Home";
import Organisations from "../Organisations";
import Projects from "../Projects";
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
      {tabId === PageTabs.PROJECTS && <Projects />}
      {tabId === PageTabs.ORGANISATIONS && (
        <Organisations
          custodianId={custodian.id}
          variant={EntityType.CUSTODIAN}
          routes={{
            name: { path: "" },
          }}
        />
      )}
      {tabId === PageTabs.USERS && <Users />}
      {tabId === PageTabs.CONTACTS && <Contacts />}
    </>
  );
}
