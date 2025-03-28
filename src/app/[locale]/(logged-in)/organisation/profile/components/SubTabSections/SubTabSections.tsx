"use client";

import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import {
  PageTabs,
  ProjectsSubTabs,
  DetailsPageSubTabs,
  UserAdminPageSubTabs,
} from "../../consts/tabs";
import { injectParamsIntoPath } from "@/utils/application";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export interface SubTabsMap {
  [key: string]: Option[];
}

interface SubTabsSectionsProps {
  tabId: PageTabs;
  subTabId: ProjectsSubTabs;
  id?: number;
}

export default function SubTabsSections({
  tabId,
  subTabId,
  id,
}: SubTabsSectionsProps) {
  const routes = useStore(store => store.application.routes);
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  console.log('SubTabSections');

  const subTabs: SubTabsMap = {
    [PageTabs.DETAILS]: [
      {
        label: t("detailsNameAndAddress"),
        value: DetailsPageSubTabs.NAME_AND_ADDRESS,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsNameAndAddress.path,
          {
            id,
          }
        )
      },
      {
        label: t("detailsDigitalIdentifiers"),
        value: DetailsPageSubTabs.DIGITAL_IDENTIFIERS,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsDigitalIdentifiers.path,
          {
            id,
          }
        )
      },
      {
        label: t("detailsSectorSizeAndWebsite"),
        value: DetailsPageSubTabs.SECTOR_SIZE_AND_WEBSITE,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsSectorSizeAndWebsite.path,
          {
            id,
          }
        )
      },
      {
        label: t("detailsSecurityCompliance"),
        value: DetailsPageSubTabs.SECURITY_COMPLIANCE,
        href: injectParamsIntoPath(
          routes.profileOrganisationDetailsSecurityCompliance.path,
          {
            id,
          }
        )
      },
    ],
    [PageTabs.USER_ADMINISTRATION]: [
      {
        label: t("userAdminDeletgates"),
        value: UserAdminPageSubTabs.DELEGATE_ADMINISTRATION,
        href: injectParamsIntoPath(
          routes.profileOrganisationUserAdministrationDelegates.path,
          {
            id,
          }
        )
      },
      {
        label: t("userAdminEmployeeStudents"),
        value: UserAdminPageSubTabs.EMPLOYEE_STUDENT_ADMINISTRATION,
        href: injectParamsIntoPath(
          routes.profileOrganisationUserAdministrationEmployeeStudent.path,
          {
            id,
          }
        )
      },
    ],
  };

  const selectedTabs = subTabs[tabId];

  if (!selectedTabs || !tabId) {
    return null;
  }

  return <SubTabs current={subTabId} tabs={selectedTabs} sx={{ mb: 4 }} />;
}
