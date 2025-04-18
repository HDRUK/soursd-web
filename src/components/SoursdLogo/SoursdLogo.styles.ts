import { css, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { SoursdLogoProps } from ".";

export const StyledLogoContainer = styled(Box)<SoursdLogoProps>(
  ({ variant }) => css`
    display: ${variant === "titled" ? "flex" : "inherit"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px;
  `
);

export const StyledLogoTitle = styled(Typography)(
  () => css`
    font-size: 90%;
    margin-top: 4px;
    letter-spacing: 5px;
    font-weight: 600;
    height: auto;
    width: auto;
    text-align: center;
    margin-right: -6px;
    line-height: 1;
  `
);
