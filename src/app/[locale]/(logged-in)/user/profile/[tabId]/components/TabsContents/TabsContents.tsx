"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageTabs } from "../../consts/tabs";
import Affiliations from "../Affiliations";
import Identity from "../Identity";
import Details from "../Details";
import Experience from "../Experience";
import Training from "../Training";

interface TabsContentsProps {
  tabId: string;
}

export default function TabsContents({ tabId }: TabsContentsProps) {
  const user = useStore(state => state.config.user);

  if (!user) notFound();

  return (
    <>
      {tabId === PageTabs.IDENTITY && <Identity />}
      {tabId === PageTabs.EXPERIENCE && <Experience />}
      {tabId === PageTabs.AFFILIATIONS && <Affiliations />}
      {tabId === PageTabs.TRAINING && <Training />}
      {tabId === PageTabs.DETAILS && <Details />}
    </>
  );
}
