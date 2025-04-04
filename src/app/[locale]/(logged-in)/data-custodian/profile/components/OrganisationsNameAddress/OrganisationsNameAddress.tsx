import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import OrganisationsNameAddressDetails from "@/modules/OrganisationsNameAddressDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function OrganisationsNameAddress() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageBody heading={t("organisationsNameAddress")}>
      <OrganisationsNameAddressDetails organisationData={organisation} />
    </PageBody>
  );
}
