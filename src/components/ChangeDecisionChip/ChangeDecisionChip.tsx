import { Box, Button, Chip } from "@mui/material";
import { VerifyIcon, RejectIcon } from "../../consts/icons";
import { useTranslations } from "next-intl";

interface ChangeDecisionChipProps {
  completed: boolean;
  onClick: () => void;
}

const NAMESPACE_TRANSLATION_COMPLETED_CHIP = "ChangeDecisionChip";

const ChangeDecisionChip = ({
  completed,
  onClick,
}: ChangeDecisionChipProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_COMPLETED_CHIP);
  return (
    <Box
      sx={{ mt: 4, display: "flex", gap: 1, justifyContent: "space-between" }}>
      <Chip
        icon={
          completed ? (
            <VerifyIcon sx={{ color: "white" }} />
          ) : (
            <RejectIcon sx={{ color: "white" }} />
          )
        }
        label={completed ? t("passed") : t("failed")}
        color={completed ? "success" : "error"}
      />
      <Button
        data-testid="validation-log-change-decision"
        variant="outlined"
        onClick={onClick}>
        {t("changeDecision")}
      </Button>
    </Box>
  );
};

export default ChangeDecisionChip;
