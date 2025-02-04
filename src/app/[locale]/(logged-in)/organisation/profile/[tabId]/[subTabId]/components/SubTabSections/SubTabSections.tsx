"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { useTranslations } from "next-intl";
import { useParams } from "@/i18n/routing";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import {
  PageTabs,
  DetailsPageSubTabs,
  UserAdminPageSubTabs,
} from "../../../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export interface SubTabsMap {
  [key: string]: Option[];
}

export default function SubTabsSections() {
  const { routes } = useApplicationData();
  const params = useParams();
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const subTabs: SubTabsMap = {
    [PageTabs.DETAILS]: [
      {
        label: t("detailsNameAndAddress"),
        value: DetailsPageSubTabs.NAME_AND_ADDRESS,
        href: routes.profileOrganisationDetailsNameAndAddress.path,
      },
      {
        label: t("detailsDigitalIdentifiers"),
        value: DetailsPageSubTabs.DIGITAL_IDENTIFIERS,
        href: routes.profileOrganisationDetailsDigitalIdentifiers.path,
      },
      {
        label: t("detailsSectorSiteAndWebsite"),
        value: DetailsPageSubTabs.SECTOR_SITE_AND_WEBSITE,
        href: routes.profileOrganisationDetailsSectorSiteAndWebsite.path,
      },
      {
        label: t("detailsSubsidiaries"),
        value: DetailsPageSubTabs.SUBSIDIARIES,
        href: routes.profileOrganisationDetailsSubsidiaries.path,
      },
      {
        label: t("detailsSecurityCompliance"),
        value: DetailsPageSubTabs.SECURITY_COMPLIANCE,
        href: routes.profileOrganisationDetailsSecurityCompliance.path,
      },
    ],
    [PageTabs.USER_ADMINISTRATION]: [
      {
        label: t("userAdminDeletgates"),
        value: UserAdminPageSubTabs.DELEGATE_ADMINISTRATION,
        href: routes.profileOrganisationUserAdministrationDelegates.path,
      },
      {
        label: t("userAdminEmployeeStudents"),
        value: UserAdminPageSubTabs.EMPLOYEE_STUDENT_ADMINISTRATION,
        href: routes.profileOrganisationUserAdministrationEmployeeStudent.path,
      },
    ],
  };
  const tab = params?.tabId as string;
  const selectedTabs = subTabs[tab];

  if (!selectedTabs || !tab) {
    return null;
  }
  const current = params?.subTabId as string;

  return <SubTabs current={current} tabs={selectedTabs} />;
}
