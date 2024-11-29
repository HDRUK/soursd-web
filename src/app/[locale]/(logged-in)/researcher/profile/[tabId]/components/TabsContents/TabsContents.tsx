"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Details from "../Details";
import Affiliations from "../Affiliations";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const user = useStore(state => state.config.auth);

  if (!user) notFound();

  return (
    <>
      {tabId === PageTabs.DETAILS && <Details />}
      {tabId === PageTabs.EXPERIENCE && "Experience"}
      {tabId === PageTabs.AFFILIATIONS && <Affiliations />}
      {tabId === PageTabs.IDENTITY && "Identity"}
      {tabId === PageTabs.TRAINING && "Training"}
    </>
  );
}
