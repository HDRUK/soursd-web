import { ResearcherAccreditation } from "../../types/application";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Text from "../../components/Text";
import { formatDisplayShortDate } from "../../utils/date";
import UserHistoryEntry from "../UserHistoryEntry";

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
    <UserHistoryEntry
      heading={title}
      startDate={awarded_at}
      description={
        <>
          <Typography>{awarding_body_name}</Typography>
          <Box sx={{ mb: 1 }}>
            <Link href={awarding_body_ror} target="_blank">
              {awarding_body_ror}
            </Link>
          </Box>
          <Text variant="caption" startIcon={<ScheduleIcon />} color="initial">
            {t("expiresOn")}: {formatDisplayShortDate(expires_at)}
          </Text>
        </>
      }
    />
  );
}
