import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import OrganisationsDataSecurityComplianceDetails from "@/modules/OrganisationsDataSecurityComplianceDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function OrganisationsDataSecurity() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageBody heading={t("organisationsDataSecurity")}>
      <OrganisationsDataSecurityComplianceDetails
        organisationData={organisation}
      />
    </PageBody>
  );
}
