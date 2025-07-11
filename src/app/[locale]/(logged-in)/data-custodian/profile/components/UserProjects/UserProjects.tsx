import { useStore } from "@/data/store";
import UserProjectsList from "@/organisms/UserProjectsList";
import { EntityType } from "@/types/api";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Projects.UserProjects";

export default function UserProjects() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const { custodianId, userId, routes } = useStore(state => ({
    userId: state.getCurrentUser().id,
    custodianId: state.getCustodian()?.id,
    routes: state.getApplication().routes,
  }));

  return (
    <UserProjectsList
      custodianId={custodianId}
      userId={userId}
      t={t}
      routes={{
        name: routes.profileCustodianProjectsSafeProject,
      }}
      variant={EntityType.CUSTODIAN}
    />
  );
}
