import { formatDisplayShortDate } from "@/utils/date";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface UserHistoryEntryProps {
  heading: ReactNode;
  startDate: string;
  description: ReactNode;
  endDate?: string;
}

export default function UserHistoryEntry({
  heading,
  startDate,
  endDate,
  description,
}: UserHistoryEntryProps) {
  return (
    <div>
      <Box
        sx={{
          display: {
            sm: "block",
            md: "flex",
          },
          gap: 4,
        }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>{" "}
        <Typography
          sx={{
            pt: "0.1rem",
            minWidth: "160px",
            textAlign: {
              sm: "initial",
              md: "right",
            },
          }}>
          {formatDisplayShortDate(startDate)}{" "}
          {endDate && `- ${formatDisplayShortDate(endDate)}`}
        </Typography>
      </Box>
      <Typography sx={{ color: "caption.main" }}>{description}</Typography>
    </div>
  );
}
