import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import { useTranslations } from "next-intl";
import Sections from "./components/Sections/Sections";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  return (
    <PageBodyContainer heading={t("title")} sx={{ mt: 3 }}>
      <PageBody>
        <PageSection>
          <Sections />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}

export default Page;
