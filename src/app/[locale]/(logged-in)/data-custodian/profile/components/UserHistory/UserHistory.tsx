import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { getInitials } from "@/utils/application";
import { getUserHistoryQuery } from "@/services/users";
import MaskLabel from "@/components/MaskLabel";
import { getDaysSince } from "@/utils/date";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

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
            <Typography variant="caption" color="text.secondary">
              {t("daysSince", { days: getDaysSince(item.created_at) })}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
