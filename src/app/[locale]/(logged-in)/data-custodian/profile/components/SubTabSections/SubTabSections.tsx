"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { useTranslations } from "next-intl";
import { ConfigurationSubTabs, PageTabs, UserSubTabs } from "../../consts/tabs";
import { injectParamsIntoPath } from "@/utils/application";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  tabId: PageTabs;
  subTabId: ConfigurationSubTabs | UserSubTabs;
  id: number;
}

export default function SubTabsSections({
  tabId,
  subTabId,
  id,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.getApplication().routes);
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
    [PageTabs.USERS]: [
      {
        label: t("affiliations"),
        value: UserSubTabs.AFFILIATIONS,
        href: injectParamsIntoPath(
          routes.profileCustodianUsersAffiliations.path,
          {
            id,
          }
        ),
      },
      {
        label: t("projects"),
        value: UserSubTabs.PROJECTS,
        href: injectParamsIntoPath(routes.profileCustodianUsersProjects.path, {
          id,
        }),
      },
      {
        label: t("identity"),
        value: UserSubTabs.IDENTITY,
        href: injectParamsIntoPath(routes.profileCustodianUsersIdentity.path, {
          id,
        }),
      },
      {
        label: t("trainingAccreditations"),
        value: UserSubTabs.TRAINING_ACCREDITATIONS,
        href: injectParamsIntoPath(
          routes.profileCustodianUsersTrainingAccreditations.path,
          {
            id,
          }
        ),
      },
      {
        label: t("custodianOrgInfo"),
        value: UserSubTabs.CUSTODIAN_ORG_INFO,
        href: injectParamsIntoPath(
          routes.profileCustodianUsersCustodianOrgInfo.path,
          {
            id,
          }
        ),
      },
      {
        label: t("history"),
        value: UserSubTabs.HISTORY,
        href: injectParamsIntoPath(routes.profileCustodianUsersHistory.path, {
          id,
        }),
      },
    ],
  };

  const selectedTabs = subTabs[tabId];

  if (!selectedTabs || !tabId) {
    return null;
  }

  return <SubTabs current={subTabId} tabs={selectedTabs} sx={{ mb: 4 }} />;
}
