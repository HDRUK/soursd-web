import { PageBody, PageBodyContainer } from "@/modules";
import ProjectsList from "@/organisms/Projects";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer heading={t("projects")}>
      <PageBody>
        <ProjectsList variant="organisation" />
      </PageBody>
    </PageBodyContainer>
  );
}
