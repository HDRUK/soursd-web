"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import Projects from "@/modules/Projects";
import Home from "../Home";
import Users from "../Users";
import Organisations from "../Organisations";
import { PageTabs } from "../../consts/tabs";
import Contacts from "../Contacts";
import { toCamelCase } from "@/utils/string";
import { PageBodyContainer } from "@/modules";
import { useTranslations } from "next-intl";

interface TabsContentsProps {
  tabId: PageTabs;
}

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function TabsContents({ tabId }: TabsContentsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const custodian = useStore(state => state.getCustodian());

  if (!custodian) notFound();

  return (
    <PageBodyContainer heading={t(toCamelCase(tabId))}>
      {tabId === PageTabs.HOME && <Home custodian={custodian} />}
      {tabId === PageTabs.PROJECTS && <Projects variant="custodian" />}
      {tabId === PageTabs.ORGANISATIONS && <Organisations />}
      {tabId === PageTabs.USERS && <Users />}
      {tabId === PageTabs.CONTACTS && <Contacts />}
    </PageBodyContainer>
  );
}
