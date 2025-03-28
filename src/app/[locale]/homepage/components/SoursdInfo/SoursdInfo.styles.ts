import { styled } from "@mui/material";
import theme from "@/theme";

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 60px;
  padding-bottom: 48px;
  background: ${theme.palette.homepageInfo.light};
  color: ${theme.palette.homepageInfo.contrastText};
`;

export { StyledContent };
