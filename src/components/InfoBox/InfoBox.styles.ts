import { styled, Alert } from "@mui/material";

export const StyledInfoBox = styled("div")(() => ({
  display: "flex",
  width: "100%",
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background1.lightPurple,
  fontWeight: "bold",
  alignItems: "center",
}));

export const StyledIcon = styled("div")(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: theme.typography.body2.fontSize,
}));
