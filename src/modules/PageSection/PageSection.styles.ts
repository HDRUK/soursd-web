import { Box, css, styled } from "@mui/material";

export const StyledPageSection = styled(Box)(
  ({ theme }) => css`
    position: relative;
    z-index: 1;
    padding: ${theme.spacing(2)};
  `
);
