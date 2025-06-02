import { useStore } from "@/data/store";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getDaysSince } from "../../utils/date";
import { getInitials } from "../../utils/application";
import MaskLabel from "../../components/MaskLabel";
import { getUserHistoryQuery } from "../../services/users";

const NAMESPACE_TRANSLATION = "UserHistory";

export default function UserHistory() {
  const user = useStore(state => state.getCurrentUser());
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { data: userHistory } = useQuery(
    getUserHistoryQuery(user?.id as number)
  );

  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      {userHistory?.data?.map(item => (
        <Card
          key={item.message}
          sx={{
            boxShadow: 1,
            borderRadius: 1,
          }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <MaskLabel
              initials={`${getInitials(`${user?.first_name} ${user?.last_name}`)}`}
              label={t(item.message)}
              size="small"
              sx={{ justifyContent: "flex-start" }}
            />
            <Typography variant="body2">{item.details}</Typography>
            <Typography variant="caption" color="text.secondary">
              {t("daysSince", { days: getDaysSince(item.created_at) })}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
