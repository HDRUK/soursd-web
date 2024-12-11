import { Box, css, styled } from "@mui/material";

export const StyledPagination = styled(Box)(
  ({ theme }) => css`
    position: relative;
    z-index: 1;
    padding: ${theme.spacing(2)};
    display: flex; /
    justify-content: center; 
    align-items: center; 
  `
);
