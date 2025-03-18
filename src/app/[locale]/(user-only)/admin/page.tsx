import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import { useTranslations } from "next-intl";
import Sections from "./components/Sections/Sections";
import { getMe } from "@/services/auth";
import { User } from "@/types/application";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

interface PageProps {
  me: User;
}

function Page({ me }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  return (
    <PageBodyContainer heading={t("title")} sx={{ mt: 3 }}>
      <PageBody>
        <PageSection me={me}>
          <Sections />
        </PageSection>
      </PageBody>
    </PageBodyContainer>
  );
}

export default Page;
