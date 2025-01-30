import { Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSubTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "12px 12px 0 0",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  "&.Mui-selected": {
    backgroundColor: "#2C5282",
    color: "#fff",
    borderBottom: "2px solid #5A67D8",
  },
  marginRight: theme.spacing(1),
}));

export { StyledSubTab };
