import { css, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { SourcdLogoProps } from ".";

export const StyledLogoContainer = styled(Box)<SourcdLogoProps>(
  ({ variant }) => css`
    display: ${variant === "titled" ? "flex" : "inherit"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 4px;
  `
);

export const StyledLogoTitle = styled(Typography)(
  () => css`
    font-size: 1.5rem;
    color: #333;
    margin-top: 0;
    letter-spacing: 5px;
    font-weight: 600;
    margin-bottom: 10px;
    height: auto;
    width: auto;
    text-align: center;
    margin-right: -6px;
  `
);
