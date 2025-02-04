"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import { DetailsPageSubTabs, UserAdminPageSubTabs } from "../../../consts/tabs";
import NameAndAddress from "../NameAndAddress";
import DigitalIdentifiers from "../DigitalIdentifiers";
import SectorSiteAndWebsite from "../SectorSiteAndWebsite";
import Subsidiaries from "../Subsidiaries";
import SecurityCompliance from "../SecurityCompliance";
import Delegates from "../Delegates";
import Users from "../Users";

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
      {subTabId === DetailsPageSubTabs.NAME_AND_ADDRESS && <NameAndAddress />}
      {subTabId === DetailsPageSubTabs.DIGITAL_IDENTIFIERS && (
        <DigitalIdentifiers />
      )}
      {subTabId === DetailsPageSubTabs.SECTOR_SITE_AND_WEBSITE && (
        <SectorSiteAndWebsite />
      )}
      {subTabId === DetailsPageSubTabs.SUBSIDIARIES && <Subsidiaries />}
      {subTabId === DetailsPageSubTabs.SECURITY_COMPLIANCE && (
        <SecurityCompliance />
      )}
      {subTabId === UserAdminPageSubTabs.DELEGATE_ADMINISTRATION && (
        <Delegates />
      )}
      {subTabId === UserAdminPageSubTabs.EMPLOYEE_STUDENT_ADMINISTRATION && (
        <Users />
      )}
    </>
  );
}
