import ActionsPanel from "@/components/ActionsPanel";
import { RejectIcon, VerifyIcon } from "@/consts/icons";
import { mockedPendingAffiliations } from "@/mocks/data/cms";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "ConfirmAffiliation";

export default function ConfirmAffiliation() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <ActionsPanel heading={t("heading")}>
      {mockedPendingAffiliations}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button startIcon={<VerifyIcon sx={{ color: "#fff" }} />}>
          {t("confirmAffiliationButton")}
        </Button>
        <Button
          startIcon={<RejectIcon />}
          variant="outlined"
          sx={{ background: "#fff" }}>
          {t("declineAffiliationButton")}
        </Button>
      </Box>
    </ActionsPanel>
  );
}
