import { Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getValidationLogCommentsQuery } from "@/services/validation_logs";
import { ValidationLog } from "@/types/logs";
import { toTitleCase } from "@/utils/string";

import ViewMore from "../ViewMore";
import ActionValidationMakeDecision from "../ActionValidationMakeDecision";
import ActionValidationLogComment from "../ActionValidationLogComment";

interface ActionsPanelValidationChecksProps {
  log: ValidationLog;
}

export default function ActionsPanelValidationChecks({
  log,
}: ActionsPanelValidationChecksProps) {
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
        {toTitleCase(log.name)}
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
      <ActionValidationMakeDecision log={log} onAction={refetchComments} />
    </Paper>
  );
}
