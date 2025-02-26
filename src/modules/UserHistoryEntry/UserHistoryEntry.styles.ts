import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";

export const StyledCertificationLink = styled(Link, {
  shouldForwardProp: prop => prop !== "hasCertification",
})<{ hasCertification: boolean }>(({ theme, hasCertification }) => ({
  color: hasCertification
    ? theme.palette.success.main
    : theme.palette.error.main,
  marginLeft: "5px",
  cursor: hasCertification ? "pointer" : "not-allowed",
  "&:hover": {
    textDecoration: hasCertification ? "underline" : "none",
  },
}));
