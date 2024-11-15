import { Box, styled } from "@mui/material";

const StyledContainer = styled(Box)``;

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 50px;
`;

const StyledGrid = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: inline-grid;
  grid-template-columns: 300px 300px 300px;
  column-gap: 20px;
`;

const StyledBox = styled(Box)`
  padding-top: 24px;
  display: flex;
`;

export { StyledContent, StyledContainer, StyledGrid, StyledBox };
