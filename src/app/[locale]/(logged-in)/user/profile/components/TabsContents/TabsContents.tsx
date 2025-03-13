"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import Projects from "@/modules/Projects";
import { PageTabs } from "../../consts/tabs";
import Affiliations from "../Affiliations";
import Identity from "../Identity";
import Home from "../Home";
import Experience from "../Experience";
import Trainings from "../Trainings";

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
      {tabId === PageTabs.TRAINING && <Trainings />}
      {tabId === PageTabs.HOME && <Home />}
      {tabId === PageTabs.PROJECTS && <Projects variant="user" />}
    </>
  );
}
