import FieldsToText from "@/components/FieldsToText";
import { ProjectDetails } from "@/types/application";
import { formatDisplayLongDate } from "@/utils/date";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { Link, Typography } from "@mui/material";

interface ProjectsSafeDataDetailsProps {
  projectDetailsData: ProjectDetails;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Projects";

export default function ProjectsSafeDataDetailsDetails({
  projectDetailsData,
  tKey = NAMESPACE_TRANSLATION,
}: ProjectsSafeDataDetailsProps) {
  const data = createProjectDetailDefaultValues(projectDetailsData);

  return (
    <FieldsToText
      data={data}
      keys={[
        "datasets",
        "data_sensitivity_level",
        [
          "legal_basis_for_data_article6",
          t => ({
            heading: t.rich("legalBasisForDataArticle6", {
              link: chunks => (
                <Link href="https://gdpr-info.eu/art-6-gdpr/" target="_blank">
                  {chunks}
                </Link>
              ),
            }),
          }),
        ],
        "duty_of_confidentiality",
        "national_data_optout",
        "request_frequency",
        "dataset_linkage_description",
        "data_minimisation",
        "data_use_description",
        [
          "access_date",
          <Typography>{formatDisplayLongDate(data.access_date)}</Typography>,
        ],
      ]}
      tKey={tKey}
    />
  );
}
