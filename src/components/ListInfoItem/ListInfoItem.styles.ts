import { styled, Alert } from "@mui/material";

export const StyledListInfoItem = styled("div")(() => ({
  display: "flex",
  width: "100%",
  flexGrow: 1,
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.lightPurple?.main,
  fontWeight: "bold",
  alignItems: "center",
  display: "flex",
  flexGrow: 1,
  "& .MuiAlert-message": {
    flexGrow: 1,
    width: "100%",
  },
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
