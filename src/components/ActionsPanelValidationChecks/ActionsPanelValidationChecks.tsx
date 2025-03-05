import { Box, Paper, Typography } from "@mui/material";
import { ReactNode, useRef } from "react";
import ViewMore from "../ViewMore";

interface ActionsPanelItemProps {
  heading?: ReactNode;
  actions?: ReactNode;
  history: { heading: ReactNode; description: ReactNode; actions: ReactNode }[];
}

export default function ActionsPanelItem({
  heading,
  actions,
  history,
}: ActionsPanelItemProps) {
  const historyRef = useRef<HTMLDivElement>(null);

  return (
    <Paper
      elevation={0}
      sx={{
        background: "#fff",
        p: 2,
        borderRadius: 2,
      }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {heading}
      </Typography>
      <ViewMore collapseNumRows={2}>
        <Box
          ref={historyRef}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {history.map(({ heading, description, actions }) => (
            <div>
              <Typography fontWeight="bold">{heading}</Typography>
              <Typography>{description}</Typography>
              {actions}
            </div>
          ))}
        </Box>
      </ViewMore>
      <Box sx={{ display: "flex", gap: 1, mt: 4 }}>{actions}</Box>
    </Paper>
  );
}
