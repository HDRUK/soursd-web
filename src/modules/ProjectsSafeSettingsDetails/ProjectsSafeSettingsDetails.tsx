import { ProjectDetails } from "../../types/application";
import { useTranslations } from "next-intl";
import { createProjectDetailDefaultValues } from "../../utils/form";
import FieldsToText from "../../components/FieldsToText";
import { Message } from "../../components/Message";

interface ProjectsSafeSettingsDetailsProps {
  projectDetailsData: ProjectDetails;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects.SafeSettings";

export default function ProjectsSafeSettingsDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeSettingsDetailsProps) {
  const t = useTranslations(tKey);

  if (!projectDetailsData)
    return <Message severity="warning">{t("noProjectDetails")}</Message>;

  const data = createProjectDetailDefaultValues(projectDetailsData, {
    transformToReadable: true,
  });

  return (
    <FieldsToText
      data={data}
      keys={["access_type", "data_privacy"]}
      tKey={tKey}
    />
  );
}
