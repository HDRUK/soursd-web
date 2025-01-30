"use client";

import { useApplicationData } from "@/context/ApplicationData";
import { useTranslations } from "next-intl";
import { useParams } from "@/i18n/routing";
import SubTabs from "@/modules/SubTabs";
import { Option } from "@/types/common";
import { PageTabs, PageSubTabs } from "../../../consts/tabs";

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
        value: PageSubTabs.NAME_AND_ADDRESS,
        href: routes.profileOrganisationDetailsNameAndAddress.path,
      },
      {
        label: t("detailsDigitalIdentifiers"),
        value: PageSubTabs.DIGITAL_IDENTIFIERS,
        href: routes.profileOrganisationDetailsDigitalIdentifiers.path,
      },
      {
        label: t("detailsSectorSiteAndWebsite"),
        value: PageSubTabs.SECTOR_SITE_AND_WEBSITE,
        href: routes.profileOrganisationDetailsSectorSiteAndWebsite.path,
      },
      {
        label: t("detailsSubsidiaries"),
        value: PageSubTabs.SUBSIDIARIES,
        href: routes.profileOrganisationDetailsSubsidiaries.path,
      },
      {
        label: t("detailsSecurityCompliance"),
        value: PageSubTabs.SECURITY_COMPLIANCE,
        href: routes.profileOrganisationDetailsSecurityCompliance.path,
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
