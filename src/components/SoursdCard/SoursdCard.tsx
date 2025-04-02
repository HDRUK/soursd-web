import { getInitials } from "@/utils/application";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Paper, PaperProps, Typography } from "@mui/material";
import ChipStatus, { Status } from "../ChipStatus";
import MaskLabel from "../MaskLabel";
import Text from "../Text";

export interface SoursdCardProps extends PaperProps {
  name: string;
  identifier: string;
  status?: Status;
}

export default function SoursdCard({
  children,
  elevation = 0,
  name,
  status,
  identifier,
  sx,
  ...restProps
}: SoursdCardProps) {
  return (
    <Paper
      elevation={elevation}
      sx={{
        p: 3,
        wordBreak: "break-word",
        border: "1px solid",
        borderColor: "borderDefault.main",
        ...sx,
      }}
      {...restProps}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <div>
          <MaskLabel initials={getInitials(name)} size="large" />
        </div>
        <div>
          <Typography variant="h3" mb={1} mt={2}>
            {name}
          </Typography>
          {status && <ChipStatus status={status} />}
        </div>
      </Box>
      <Typography fontWeight={700}>SOURSD identifier:</Typography>
      <Text
        color="primary"
        sx={{
          color: "primary.main",
          textDecoration: "underline",
          mb: 3,
        }}
        copyable>
        {identifier}
      </Text>
      <Typography color="textSecondary.main">{children}</Typography>
    </Paper>
  );
}
