import { styled } from "@mui/material";
import theme from "@/theme";


const StyledContent = styled("div")`
  background: linear-gradient(180deg, #f6ebf8, #ffffff 100%);
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: auto;
  color: ${theme.palette.homepageKeyFeatures.contrastText};
`;

const StyledGrid = styled("div")`
  justify-content: space-around;
  text-align: left;
  display: inline-grid;
  grid-template-columns: auto auto auto;
  column-gap: 24px;
  padding: 0px;
  margin-bottom: 24px;
  margin-top: 24px;
`;

const StyledContainer = styled("div")`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 5%);
  min-height: 240px;
`;

export { StyledContent, StyledGrid, StyledContainer };
