import { Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getValidationLogCommentsQuery } from "@/services/validation_logs";
import { ValidationLog } from "@/types/logs";
import ActionValidationMakeDecision from "@/modules/ActionValidationMakeDecision";
import ViewMore from "@/components/ViewMore";
import ActionValidationLogComment from "@/components/ActionValidationLogComment";
import useFallbackTranslations from "@/hooks/useFallbackTranslations";

interface ActionsPanelValidationCheckProps {
  log: ValidationLog;
}

const NAMESPACE_TRANSLATION = "ActionsPanelValidationCheck";

export default function ActionsPanelValidationCheck({
  log,
}: ActionsPanelValidationCheckProps) {
  const t = useFallbackTranslations(NAMESPACE_TRANSLATION);
  const { data: comments, refetch: refetchComments } = useQuery({
    ...getValidationLogCommentsQuery(log.id),
    enabled: !!log.id,
    initialData: {
      data: log?.comments || [],
      message: "",
      status: 200,
    },
  });

  return (
    <Paper
      key={log.id}
      elevation={0}
      sx={{
        background: "#fff",
        p: 2,
        borderRadius: 2,
      }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t(log.validation_check.name)}
      </Typography>

      <ViewMore collapseNumRows={2}>
        {comments?.data
          ?.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .map(comment => (
            <div key={comment.id}>
              <ActionValidationLogComment comment={comment} />
            </div>
          ))}
      </ViewMore>
      <ActionValidationMakeDecision
        log={log}
        onAction={async () => {
          await refetchComments();
        }}
      />
    </Paper>
  );
}
