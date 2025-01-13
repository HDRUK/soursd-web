import { Box, Card, CardContent, CardProps } from "@mui/material";
import { ReactNode } from "react";

interface ResultsCardProps extends Omit<CardProps, "content"> {
  icon: ReactNode;
  content: ReactNode;
  details: ReactNode;
  actions: ReactNode;
}

export default function ResultsCard({
  icon,
  content,
  details,
  actions,
  ...restProps
}: ResultsCardProps) {
  return (
    <Card sx={{ mb: 1 }} role="listitem" {...restProps}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            width: "100%",
            gap: {
              xs: 1,
              md: 2,
            },
            alignItems: {
              md: "center",
            },
          }}>
          <Box sx={{ display: "flex", flexGrow: 1, gap: 2 }}>
            {icon}
            <div>{content}</div>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,

              textAlign: {
                md: "right",
              },
            }}>
            <div>{details}</div>
            <div>{actions}</div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
