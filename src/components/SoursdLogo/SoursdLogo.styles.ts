import { css, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { SoursdLogoProps } from ".";

export const StyledLogoContainer = styled(Box)<SoursdLogoProps>(
  ({ variant, direction }) => css`
    display: ${variant === "titled" ? "flex" : "inherit"};
    flex-direction: ${direction ? "row" : "column"};
    align-items: center;
    justify-content: center;
    padding: 4px;
  `
);

export const StyledLogoTitle = styled(Typography)(
  () => css`
    font-size: 90%;
    letter-spacing: 2px;
    font-weight: 600;
    height: auto;
    width: auto;
    text-align: center;
    line-height: 1;
  `
);
