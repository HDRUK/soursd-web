"use client";

import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { useParams } from "@/i18n/routing";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { PageTabs, ConfigurationSubTabs } from "../../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export interface SubTabsMap {
  [key: string]: Option[];
}

export default function SubTabsSections() {
  const routes = useStore(store => store.application.routes);
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs: SubTabsMap = {
    [PageTabs.CONFIGURATION]: [
      {
        label: t("configurationRules"),
        value: ConfigurationSubTabs.RULES,
        href: routes.profileCustodianConfigurationRules.path,
      },
      {
        label: t("configurationValidationChecks"),
        value: ConfigurationSubTabs.VALIDATION_CHECKS,
        href: routes.profileCustodianConfigurationValidationChecks.path,
      },
      {
        label: t("configurationWebhooks"),
        value: ConfigurationSubTabs.WEBHOOKS,
        href: routes.profileCustodianConfigurationWebhooks.path,
      },
    ],
  };
  const tab = params?.tabId as string;
  const selectedTabs = subTabs[tab];

  if (!selectedTabs || !tab) {
    return null;
  }
  const current = params?.subTabId as string;

  return <SubTabs current={current} tabs={selectedTabs} sx={{ mb: 4 }} />;
}
