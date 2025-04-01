import FieldsToText from "@/components/FieldsToText";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";

interface ProjectsSafeSettingsDetailsProps {
  projectDetailsData: ProjectDetails;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function ProjectsSafeSettingsDetailsDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeSettingsDetailsProps) {
  const data = createProjectDetailDefaultValues(projectDetailsData);

  return (
    <FieldsToText
      data={data}
      keys={["access_type", "data_privacy"]}
      tKey={tKey}
    />
  );
}
