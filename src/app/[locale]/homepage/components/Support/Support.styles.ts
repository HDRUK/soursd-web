import { Box, styled } from "@mui/material";

const StyledContainer = styled("div")`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const StyledContent = styled("div")`
  background: #ffffff;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: auto;
  color: black;
`;

const StyledGrid = styled("div")`
  justify-content: space-around;
  text-align: center;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 24px;
`;

const StyledBox = styled(Box)`
  padding-top: 24px;
  display: flex;
`;

export { StyledContent, StyledContainer, StyledGrid, StyledBox };
