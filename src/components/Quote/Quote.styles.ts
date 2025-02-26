import { Typography, css, styled } from "@mui/material";

export const StyledName = styled(Typography)(
  ({ theme }) => css`
    font-weight: bold;
    padding: 0 ${theme.spacing(2)};
    align-items: flex-end;
    flex-grow: 1;
    display: flex;
  }}
  `
);
