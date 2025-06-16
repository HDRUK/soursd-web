import { PageBody, PageColumnBody, PageColumns } from "@/modules";
import ProjectUsersList from "@/organisms/ProjectUsersList";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Projects";

export default function ProjectsSafePeoplePage() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBody heading={t("safePeople")}>
      <PageColumns>
        <PageColumnBody lg={5}>
          <ProjectUsersList variant={EntityType.USER} />
        </PageColumnBody>
      </PageColumns>
    </PageBody>
  );
}
