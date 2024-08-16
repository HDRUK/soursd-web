import { ResearcherAccreditation } from "@/types/application";
import { Link, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Text from "@/components/Text";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import { useTranslations } from "next-intl";

interface ResearcherAccreditationEntryProps {
  data: ResearcherAccreditation;
}

const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

export default function ResearcherAccreditationEntry({
  data,
}: ResearcherAccreditationEntryProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);

  const {
    awarded_at,
    awarding_body_name,
    expires_at,
    title,
    awarding_body_ror,
  } = data;

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Typography>{awarded_at}</Typography>
      <Text startIcon={<BusinessIcon />} variant="subtitle2">
        {t("awardedAt")}: {awarded_at}
      </Text>
      <Text startIcon={<GroupIcon />}>
        {t("awardingBody")}: {awarding_body_name}
      </Text>
      <Text startIcon={<ScheduleIcon />}>
        {t("expiresOn")}: {expires_at}
      </Text>
      <Link href={awarding_body_ror} target="_blank">
        {awarding_body_ror}
      </Link>
    </div>
  );
}
