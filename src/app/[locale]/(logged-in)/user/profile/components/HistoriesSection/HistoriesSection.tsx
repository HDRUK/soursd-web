import { Message } from "@/components/Message";
import { StoreUserHistories } from "@/data/store";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface HistoriesSectionProps {
  children: ReactNode;
  count: number | undefined;
  type: keyof StoreUserHistories;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function HistoriesSection({
  children,
  count,
  type,
}: HistoriesSectionProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {!count ? (
        <Message severity="info">
          {tProfile("noHistoryResults", { type })}
        </Message>
      ) : (
        children
      )}
    </Box>
  );
}
