import { Box, Theme, css, styled } from "@mui/material";

export const StyledBoxGroup = styled(Box)(
  ({ theme, numCols }: { theme: Theme; numCols: number }) => css`
    display: flex;
    gap: ${theme.spacing(1)};
    flex-direction: column;

    > * {
      width: 100%;
    }

    ${theme.breakpoints.up("md")} {
      flex-direction: row;

      > * {
        width: calc(100% / ${numCols});
      }
    }
  `
);
