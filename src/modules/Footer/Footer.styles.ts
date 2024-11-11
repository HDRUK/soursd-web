import { css, Link, styled } from "@mui/material";

export const StyledFooter = styled("div")(
  ({ theme }) => css`
    width: 100%;
    position: relative;
    color: #fff;
    display: grid;
    gap: ${theme.spacing(5)};
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: row;
    padding: ${theme.spacing(3)} ${theme.spacing(8)};

    ${theme.breakpoints.up("md")} {
      gap: ${theme.spacing(15)};
      flex-direction: row;
      padding: ${theme.spacing(5)} ${theme.spacing(20)};
    }
  `
);

export const StyledLink = styled(Link)(
  () => css`
    cursor: pointer;
    padding-top: 5px;
  `
);
