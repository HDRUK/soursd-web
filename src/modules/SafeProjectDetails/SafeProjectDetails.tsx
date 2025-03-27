import FieldsToText from "@/components/FieldsToText";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance, PageSection } from "@/modules";
import { Project } from "@/types/application";
import { formatDisplayLongDate } from "@/utils/date";
import { toCamelCase } from "@/utils/string";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface SafeProjectDetailsProps {
  projectData: Project;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function SafeProjectDetails({
  projectData,
}: SafeProjectDetailsProps) {
  const t = useTranslations();

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
        "lay_summary",
        "public_benefit",
        "technical_summary",
        "other_approval_committees",
      ]}
      tKey={NAMESPACE_TRANSLATION}
    />
  );
}
