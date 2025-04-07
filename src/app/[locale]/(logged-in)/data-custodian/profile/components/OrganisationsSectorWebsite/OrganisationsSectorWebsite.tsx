import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import OrganisationsSectorWebsiteDetails from "@/modules/OrganisationsSectorWebsiteDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function OrganisationsSectorWebsite() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageBody heading={t("organisationsSectorWebsite")}>
      <OrganisationsSectorWebsiteDetails organisationData={organisation} />
    </PageBody>
  );
}
