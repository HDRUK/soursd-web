"use client";

import { useStore } from "@/data/store";
import { notFound } from "next/navigation";
import {
  DetailsPageSubTabs,
  UserAdminPageSubTabs,
  getSubTabs,
  PageTabs,
  PageSubTabs,
} from "../../../consts/tabs";
import NameAndAddress from "../NameAndAddress";
import DigitalIdentifiers from "../DigitalIdentifiers";
import SectorSiteAndWebsite from "../SectorSiteAndWebsite";
import Subsidiaries from "../Subsidiaries";
import SecurityCompliance from "../SecurityCompliance";
import Delegates from "../Delegates";
import Users from "../Users";

interface TabsContentsProps {
  tabId: string;
  subTabId: string;
}

export default function SubTabsContents({
  tabId,
  subTabId,
}: TabsContentsProps) {
  const [user, organisation] = useStore(state => [
    state.getUser(),
    state.getOrganisation(),
  ]);

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (
    !user ||
    !organisation ||
    !availableSubTabs.includes(subTabId as PageSubTabs)
  )
    notFound();

  let content = null;

  switch (subTabId) {
    case DetailsPageSubTabs.NAME_AND_ADDRESS:
      content = <NameAndAddress />;
      break;
    case DetailsPageSubTabs.DIGITAL_IDENTIFIERS:
      content = <DigitalIdentifiers />;
      break;
    case DetailsPageSubTabs.SECTOR_SITE_AND_WEBSITE:
      content = <SectorSiteAndWebsite />;
      break;
    case DetailsPageSubTabs.SUBSIDIARIES:
      content = <Subsidiaries />;
      break;
    case DetailsPageSubTabs.SECURITY_COMPLIANCE:
      content = <SecurityCompliance />;
      break;
    case UserAdminPageSubTabs.DELEGATE_ADMINISTRATION:
      content = <Delegates />;
      break;
    case UserAdminPageSubTabs.EMPLOYEE_STUDENT_ADMINISTRATION:
      content = <Users />;
      break;
    default:
      content = null;
  }

  return content;
}
