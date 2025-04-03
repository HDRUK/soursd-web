import FieldsToText from "@/components/FieldsToText";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { Typography } from "@mui/material";

interface ProjectsSafeOuputsDetailsProps {
  projectDetailsData: ProjectDetails;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects.SafeOutputs";

export default function ProjectsSafeOutputsDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeOuputsDetailsProps) {
  const data = createProjectDetailDefaultValues(projectDetailsData, {
    transformToReadable: true,
  });

  return (
    <FieldsToText
      data={data}
      keys={[
        "data_assets",
        {
          column_id: "research_outputs",
          content: (
            <Typography component="ul">
              {data?.research_outputs?.map((url: string) => (
                <li>
                  <a href={url}>{url}</a>
                </li>
              ))}
            </Typography>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
