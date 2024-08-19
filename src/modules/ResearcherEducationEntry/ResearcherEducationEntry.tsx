import { ResearcherEducation } from "@/types/application";
import { Typography } from "@mui/material";
import Text from "@/components/Text";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";
import { useTranslations } from "next-intl";

interface ResearcherEducationEntryProps {
  data: ResearcherEducation;
}

const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

export default function ResearcherEducationEntry({
  data,
}: ResearcherEducationEntryProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);
  const { title, from, to, institute_name } = data;

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Text startIcon={<BusinessIcon />} variant="subtitle2">
        {t("provider")}: {institute_name}
      </Text>
      <Text startIcon={<ScheduleIcon />}>
        {from} - {to}
      </Text>
    </div>
  );
}
