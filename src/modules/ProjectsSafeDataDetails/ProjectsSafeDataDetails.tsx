import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { ProjectDetails } from "../../types/application";
import FieldsToText from "../../components/FieldsToText";
import { Message } from "../../components/Message";
import { formatDisplayLongDate } from "../../utils/date";
import { createProjectDetailDefaultValues } from "../../utils/form";

interface ProjectsSafeDataDetailsProps {
  projectDetailsData: ProjectDetails | null;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects.SafeData";

export default function ProjectsSafeDataDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeDataDetailsProps) {
  const t = useTranslations(tKey);

  if (!projectDetailsData)
    return <Message severity="warning">{t("noProjectDetails")}</Message>;

  const data = createProjectDetailDefaultValues(projectDetailsData, {
    transformToReadable: true,
  });

  return (
    <FieldsToText
      data={data}
      keys={[
        "datasets",
        "data_sensitivity_level",
        "legal_basis_for_data_article6",
        "duty_of_confidentiality",
        "national_data_optout",
        "request_frequency",
        "dataset_linkage_description",
        "data_minimisation",
        "data_use_description",
        {
          column_id: "access_date",
          content: (
            <Typography>{formatDisplayLongDate(data.access_date)}</Typography>
          ),
        },
      ]}
      tKey={tKey}
    />
  );
}
