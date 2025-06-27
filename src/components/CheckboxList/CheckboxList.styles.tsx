import { styled } from "@mui/material/styles";
import { ListItem, ListItemText } from "@mui/material";

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  "&:first-of-type": {
    marginTop: 0,
  },
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& .MuiTypography-root": {
    fontWeight: "bold",
  },
}));
