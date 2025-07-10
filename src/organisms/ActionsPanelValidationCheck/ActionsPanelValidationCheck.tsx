import { Paper, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import ActionValidationLogComment from "../../components/ActionValidationLogComment";
import ViewMore from "../../components/ViewMore";
import { getValidationLogCommentsQuery } from "../../services/validation_logs";
import { ValidationLog } from "../../types/logs";
import ActionValidationMakeDecision from "../ActionValidationMakeDecision";

interface ActionsPanelValidationCheckProps {
  log: ValidationLog;
}

export default function ActionsPanelValidationCheck({
  log,
}: ActionsPanelValidationCheckProps) {
  const queryClient = useQueryClient();
  const { custodianId, projectId, registryId } = useStore(store => ({
    custodianId: store.getCustodian()?.id as number,
    projectId: store.getCurrentProject()?.id as number,
    registryId: store.getCurrentProjectUser()?.registry.id as number,
  }));

  const { data: comments, refetch: refetchComments } = useQuery({
    ...getValidationLogCommentsQuery(log.id),
    enabled: !!log.id,
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
        {log.validation_check.description}
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
          queryClient.refetchQueries({
            queryKey: [
              "getCustodianProjectUserValidationLogs",
              custodianId,
              projectId,
              registryId,
            ],
          });
        }}
      />
    </Paper>
  );
}
