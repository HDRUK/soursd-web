"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { PageSubTabs } from "../../../consts/tabs";
import NameAndAddress from "../NameAndAddress";
import DigitalIdentifiers from "../DigitalIdentifiers";
import SectorSiteAndWebsite from "../SectorSiteAndWebsite";
import Subsidiaries from "../Subsidiaries";
import SecurityCompliance from "../SecurityCompliance";

interface TabsContentsProps {
  subTabId: string;
}

export default function SubTabsContents({ subTabId }: TabsContentsProps) {
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  if (!user || !organisation) notFound();

  return (
    <>
      {subTabId === PageSubTabs.NAME_AND_ADDRESS && <NameAndAddress />}
      {subTabId === PageSubTabs.DIGITAL_IDENTIFIERS && <DigitalIdentifiers />}
      {subTabId === PageSubTabs.SECTOR_SITE_AND_WEBSITE && (
        <SectorSiteAndWebsite />
      )}
      {subTabId === PageSubTabs.SUBSIDIARIES && <Subsidiaries />}
      {subTabId === PageSubTabs.SECURITY_COMPLIANCE && <SecurityCompliance />}
    </>
  );
}
