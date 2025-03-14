import { useTranslations } from "next-intl";
import ActionsPanel from "@/components/ActionsPanel";
import LoadingWrapper from "@/components/LoadingWrapper";
import { ValidationLog } from "@/types/logs";
import ActionsPanelValidationCheck from "../ActionsPanelValidationCheck";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

interface ActionValidationPanelProps {
  logs: ValidationLog[];
  isLoading: boolean;
}

function ActionValidationPanel({
  logs,
  isLoading = false,
}: ActionValidationPanelProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
  return (
    <LoadingWrapper loading={isLoading}>
      <ActionsPanel heading={t("title")}>
        {logs.map(log => (
          <ActionsPanelValidationCheck key={log.id} log={log} />
        ))}
      </ActionsPanel>
    </LoadingWrapper>
  );
}

export default ActionValidationPanel;
