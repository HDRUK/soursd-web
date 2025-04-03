import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function Contacts() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer heading={t("contactsHeading")}>
      <PageBody>
        <PageSection>Contacts</PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}
