import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),

  "&:last-child": {
    marginBottom: 0,
  },

  "&.unread": {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },

  "&.read": {
    fontWeight: "normal",
  },
}));
