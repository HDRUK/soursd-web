import { css, styled } from "@mui/material";

export const StyledFooter = styled("div")(
  ({ theme }) => css`
    width: 100%;
    position: relative;
    color: #fff;
    display: flex;
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(3)} ${theme.spacing(8)};
    flex-direction: column;
    align-items: flex-start;

    ${theme.breakpoints.up("md")} {
      flex-direction: row;
      gap: ${theme.spacing(9)};
      padding: ${theme.spacing(5)} ${theme.spacing(3)};
      align-items: flex-end;
    }
  `
);
