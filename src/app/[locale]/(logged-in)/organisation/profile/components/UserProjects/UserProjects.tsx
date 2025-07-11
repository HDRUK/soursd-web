import { useStore } from "@/data/store";
import UserProjectsList from "@/organisms/UserProjectsList";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Projects.UserProjects";

export default function UserProjects() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const { userId, routes } = useStore(state => ({
    userId: state.getCurrentUser().id,
    routes: state.getApplication().routes,
  }));

  return (
    <UserProjectsList
      userId={userId}
      t={t}
      routes={{
        name: routes.profileOrganisationProjectsSafeProject,
      }}
      variant={EntityType.ORGANISATION}
    />
  );
}
