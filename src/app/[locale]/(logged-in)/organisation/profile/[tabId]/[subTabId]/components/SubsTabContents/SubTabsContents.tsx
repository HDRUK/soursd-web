"use client";

import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { notFound } from "next/navigation";
import {
  DetailsPageSubTabs,
  getSubTabs,
  PageSubTabs,
  PageTabs,
  UserAdminPageSubTabs,
} from "../../../consts/tabs";
import Delegates from "../Delegates";
import DigitalIdentifiers from "../DigitalIdentifiers";
import NameAndAddress from "../NameAndAddress";
import SectorSizeAndWebsite from "../SectorSizeAndWebsite"
import SecurityCompliance from "../SecurityCompliance";
import Subsidiaries from "../Subsidiaries";
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

  // if (
  //   !user ||
  //   !organisation ||
  //   !availableSubTabs.includes(subTabId as PageSubTabs)
  // )
  //   notFound();

  let content = null;

  switch (subTabId) {
    case DetailsPageSubTabs.NAME_AND_ADDRESS:
      content = <NameAndAddress />;
      break;
    case DetailsPageSubTabs.DIGITAL_IDENTIFIERS:
      content = <DigitalIdentifiers />;
      break;
    case DetailsPageSubTabs.SECTOR_SIZE_AND_WEBSITE:
      content = <SectorSizeAndWebsite />;
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

  return <PageBody>{content}</PageBody>;
}
