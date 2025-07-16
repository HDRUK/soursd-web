import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import OrganisationsSubsidiariesTable from "@/modules/OrganisationsSubsidiariesTable";
import OrganisationsNameAddressDetails from "@/modules/OrganisationsNameAddressDetails";
import { useTranslations } from "next-intl";
import { Box } from "@mui/system";

const NAMESPACE_TRANSLATION = "Organisations";
const NAMESPACE_TRANSLATION_SUBSIDIARIES = "Organisations.Subsidiaries";

export default function OrganisationsNameAddress() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tSubsidiaries = useTranslations(NAMESPACE_TRANSLATION_SUBSIDIARIES);
  const organisation = useStore(state => state.getCurrentOrganisation());

  return (
    <PageBody heading={t("organisationsNameAddress")}>
      <PageSection>
        <OrganisationsNameAddressDetails organisationData={organisation} />
      </PageSection>
      <PageSection>
        <Box
          sx={{
            maxWidth: {
              lg: "50%",
            },
          }}>
          <OrganisationsSubsidiariesTable
            includeColumns={["organisationName", "address"]}
            data={organisation.subsidiaries || []}
            t={tSubsidiaries}
            isPaginated={false}
          />
        </Box>
      </PageSection>
    </PageBody>
  );
}
