import { PageBody } from "@/modules";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Projects";

export default function ProjectsSafePeoplePage() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBody heading={t("safePeople")}>
      <ProjectUsersList variant={EntityType.CUSTODIAN} />
    </PageBody>
  );
}
