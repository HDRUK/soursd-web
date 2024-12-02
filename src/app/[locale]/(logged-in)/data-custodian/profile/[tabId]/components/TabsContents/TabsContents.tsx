"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Details from "../Details";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const issuer = useStore(state => state.getIssuer());

  if (!issuer) notFound();

  return (
    <>
      {tabId === PageTabs.DETAILS && <Details issuer={issuer} />}
      {tabId === PageTabs.USERS && "Users"}
      {tabId === PageTabs.CONFIGURATION && "Configuration"}
      {tabId === PageTabs.KEYCARDS && "Keycards"}
    </>
  );
}
