import FieldsToText from "@/components/FieldsToText";
import { ResearcherProject } from "@/types/application";
import { formatDisplayLongDate } from "@/utils/date";
import { createProjectDefaultValues } from "@/utils/form";
import { Typography } from "@mui/material";

interface SafeProjectDetailsProps {
  projectData: ResearcherProject;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function SafeProjectDetails({
  projectData,
}: SafeProjectDetailsProps) {
  const data = createProjectDefaultValues(projectData);

  return (
    <FieldsToText
      data={data}
      keys={[
        "request_category_type",
        [
          "period",
          <Typography>
            {formatDisplayLongDate(data.start_date)} to{" "}
            {formatDisplayLongDate(data.end_date)}
          </Typography>,
        ],
        [
          "dataCustodians",
          <Typography component="ul">
            {projectData.custodians?.map(({ name }) => <li>{name}</li>)}
          </Typography>,
        ],
        "lay_summary",
        "public_benefit",
        "technical_summary",
        "other_approval_committees",
      ]}
      tKey={NAMESPACE_TRANSLATION}
    />
  );
}
