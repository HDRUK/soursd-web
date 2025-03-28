import FieldsToText from "@/components/FieldsToText";
import { ResearcherProject } from "@/types/application";
import { formatDisplayLongDate } from "@/utils/date";
import { Typography } from "@mui/material";

interface SafeProjectDetailsProps {
  projectData: ResearcherProject;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function SafeProjectDetails({
  projectData,
}: SafeProjectDetailsProps) {
  return (
    <FieldsToText
      data={projectData}
      keys={[
        "request_category_type",
        [
          "period",
          <Typography>
            {formatDisplayLongDate(projectData.start_date)} to{" "}
            {formatDisplayLongDate(projectData.end_date)}
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
