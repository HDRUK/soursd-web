import { styled } from "@mui/material";

const InfoPageWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "12px",
  paddingRight: "12px",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  paddingBottom: "48px",
}));

export { InfoPageWrapper };
