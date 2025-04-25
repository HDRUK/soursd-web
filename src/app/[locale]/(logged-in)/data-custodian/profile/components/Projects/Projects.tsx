import { DefaultFormValuesMode } from "@/consts/form";
import { AddIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { useRouter } from "@/i18n/routing";
import ProjectsList from "@/modules/Projects";
import { postCustodianProjectQuery } from "@/services/custodians";
import { injectParamsIntoPath } from "@/utils/application";
import { createProjectDefaultValues } from "@/utils/form";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "Projects";

export default function Projects() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const router = useRouter();
  const { custodianId, routes } = useStore(state => ({
    routes: state.getApplication().routes,
    custodianId: state.getCustodian()?.id,
  }));

  const { mutateAsync: mutateCreateProject, ...mutationState } = useMutation(
    postCustodianProjectQuery()
  );

  const handleCreateProject = async () => {
    const { data: id } = await mutateCreateProject({
      params: {
        custodianId,
      },
      payload: createProjectDefaultValues(
        {
          title: t("addNewProjectTitle"),
        },
        DefaultFormValuesMode.DB
      ),
    });

    const path = injectParamsIntoPath(
      routes.profileCustodianProjectsSafeProject.path,
      {
        id,
      }
    );

    router.push(path);
  };

  useQueryAlerts(mutationState, {
    showOnlyError: true,
  });

  return (
    <ProjectsList
      variant="custodian"
      actions={
        <Button startIcon={<AddIcon />} onClick={handleCreateProject}>
          {t("addNewProjectButton")}
        </Button>
      }
    />
  );
}
