import { useTranslations } from "next-intl";
import ActionsPanel from "@/components/ActionsPanel";
import LoadingWrapper from "@/components/LoadingWrapper";
import { ValidationLog } from "@/types/logs";
import { QueryState } from "@/types/form";
import { Message } from "@/components/Message";
import ActionsPanelValidationCheck from "../ActionsPanelValidationCheck";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

interface ActionValidationPanelProps {
  logs: ValidationLog[];
  queryState: QueryState;
}

function ActionValidationPanel({
  logs,
  queryState = { isLoading: false, isError: false },
}: ActionValidationPanelProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
  return (
    <LoadingWrapper loading={queryState?.isLoading || false}>
      <ActionsPanel heading={t("title")}>
        {logs.map(log => (
          <ActionsPanelValidationCheck key={log.id} log={log} />
        ))}
      </ActionsPanel>
      {queryState.isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {t(queryState.error)}
        </Message>
      )}
    </LoadingWrapper>
  );
}

export default ActionValidationPanel;
