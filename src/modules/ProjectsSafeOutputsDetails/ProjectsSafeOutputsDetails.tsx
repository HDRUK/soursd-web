import FieldsToText from "@/components/FieldsToText";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { Typography } from "@mui/material";

interface ProjectsSafeOuputsDetailsProps {
  projectDetailsData: ProjectDetails;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function ProjectsSafeOutputsDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeOuputsDetailsProps) {
  const data = createProjectDetailDefaultValues(projectDetailsData);

  return (
    <FieldsToText
      data={data}
      keys={[
        "data_assets",
        [
          "research_outputs",
          <Typography component="ul">
            {data?.research_outputs?.map((url: string) => (
              <li>
                <a href={url}>{url}</a>
              </li>
            ))}
          </Typography>,
        ],
      ]}
      tKey={tKey}
    />
  );
}
