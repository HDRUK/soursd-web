import { Box, Button, Paper, Typography } from "@mui/material";
import Textarea from "@mui/joy/Textarea";

import { ReactNode, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getValidationLogCommentsQuery } from "@/services/validation_logs";
import { getUserQuery } from "@/services/users";
import { getDaysSince } from "@/utils/date";
import { capitaliseFirstLetter } from "@/utils/string";
import { ValidationLog, Comment } from "@/types/logs";
import { VerifyIcon, RejectIcon } from "@/consts/icons";
import { toTitleCase } from "@/utils/string";
import ViewMore from "../ViewMore";

interface ActionsPanelValidationChecksProps {
  log: ValidationLog;
}

interface LogCommentProps {
  comment: Comment;
}

const LogComment = ({ comment }: LogCommentProps) => {
  const { id, user_id, comment: text, updated_at } = comment;
  const { data: userData } = useQuery(getUserQuery(user_id as number));

  const { first_name, last_name, user_group } = userData?.data || {};

  return (
    <div key={`validation_log_comment${id}`}>
      <Typography fontWeight="bold">
        {first_name} {last_name} (
        {capitaliseFirstLetter(user_group?.toLowerCase().slice(0, -1) || "")}),{" "}
        {getDaysSince(updated_at)}
        {" days since"}
      </Typography>
      <Typography>{text}</Typography>
      {}
    </div>
  );
};

function ActionValidationCheck({}) {
  return (
    <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
      <Textarea sx={{ width: "100%" }} minRows={8} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<VerifyIcon fill="inherit" color="inherit" />}>
        Pass
      </Button>
      <Button variant="outlined" startIcon={<RejectIcon />}>
        Fail
      </Button>
      <Button variant="outlined">&#8230;</Button>
    </Box>
  );
}

export default function ActionsPanelValidationChecks({
  log,
}: ActionsPanelValidationChecksProps) {
  const { data: comments } = useQuery({
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
        {comments?.data?.map(comment => (
          <div key={comment.id}>
            <LogComment comment={comment} />
          </div>
        ))}
      </ViewMore>
      <ActionValidationCheck />
    </Paper>
  );
}
