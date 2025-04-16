"use client";

import { useStore } from "@/data/store";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { injectParamsIntoPath } from "@/utils/application";
import { useTranslations } from "next-intl";
import { UserSubTabs } from "../../../../../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  userId: number;
  subTabId: UserSubTabs;
}

export default function SubTabsSections({
  userId,
  subTabId,
}: SubTabsSectionsProps) {
  console.log('Org profile subsub SubTabsSections', userId, subTabId);
  const routes = useStore(store => store.getApplication().routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs = [
    {
      label: t("affiliations"),
      value: UserSubTabs.AFFILIATIONS,
      href: injectParamsIntoPath(
        routes.profileOrganisationUsersAffiliations.path,
        {
          userId,
        }
      ),
    },
    {
      label: t("projects"),
      value: UserSubTabs.PROJECTS,
      href: injectParamsIntoPath(routes.profileOrganisationUsersProjects.path, {
        userId,
      }),
    },
    {
      label: t("identity"),
      value: UserSubTabs.IDENTITY,
      href: injectParamsIntoPath(routes.profileOrganisationUsersIdentity.path, {
        userId,
      }),
    },
    {
      label: t("trainingAccreditations"),
      value: UserSubTabs.TRAINING_ACCREDITATIONS,
      href: injectParamsIntoPath(
        routes.profileOrganisationUsersTrainingAccreditations.path,
        {
          userId,
        }
      ),
    },
    // {
    //   label: t("custodianOrgInfo"),
    //   value: UserSubTabs.CUSTODIAN_ORG_INFO,
    //   href: injectParamsIntoPath(
    //     routes.profileOrganisationUsersCus.path,
    //     {
    //       projectId,
    //       userId,
    //     }
    //   ),
    // },
    {
      label: t("history"),
      value: UserSubTabs.HISTORY,
      href: injectParamsIntoPath(routes.profileOrganisationUsersHistory.path, {
        userId,
      }),
    },
  ];
  console.log('subTabId', subTabId, 'tabs', subTabs);
  return <SubTabs current={subTabId} tabs={subTabs} sx={{ mb: 4 }} />;
}
