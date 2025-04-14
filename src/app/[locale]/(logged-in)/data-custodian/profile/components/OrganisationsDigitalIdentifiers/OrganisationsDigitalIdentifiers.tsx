import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import OrganisationsDigitalIdentifiersDetails from "@/modules/OrganisationsDigitalIdentifiersDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function OrganisationsDigitalIdentifiers() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageBody heading={t("organisationsDigitalIdentifiers")}>
      <OrganisationsDigitalIdentifiersDetails organisationData={organisation} />
    </PageBody>
  );
}
