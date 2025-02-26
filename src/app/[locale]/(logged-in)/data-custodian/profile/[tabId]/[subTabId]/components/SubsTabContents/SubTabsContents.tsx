"use client";

import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import { notFound } from "next/navigation";
import {
  getSubTabs,
  ConfigurationSubTabs,
  PageTabs,
} from "../../../consts/tabs";
import Rules from "../Rules";
import ValidationChecks from "../ValidationChecks";
import Webhooks from "../Webhooks";

interface TabsContentsProps {
  tabId: string;
  subTabId: string;
}

export default function SubTabsContents({
  tabId,
  subTabId,
}: TabsContentsProps) {
  const [user, custodian] = useStore(state => [
    state.getUser(),
    state.getCustodian(),
  ]);

  const availableSubTabs = getSubTabs(tabId as PageTabs) || [];

  if (
    !user ||
    !custodian ||
    !availableSubTabs.includes(subTabId as ConfigurationSubTabs)
  )
    notFound();

  let content = null;

  switch (subTabId) {
    case ConfigurationSubTabs.RULES:
      content = <Rules />;
      break;
    case ConfigurationSubTabs.VALIDATION_CHECKS:
      content = <ValidationChecks />;
      break;
    case ConfigurationSubTabs.WEBHOOKS:
      content = <Webhooks />;
      break;
    default:
      content = null;
  }

  return <PageBody>{content}</PageBody>;
}
