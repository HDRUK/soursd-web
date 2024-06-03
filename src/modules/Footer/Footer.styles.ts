import { css, styled } from "@mui/material";

export const StyledLinks = styled("div")(
  ({ theme }) => css`
    width: 100%;
    position: relative;
    color: #fff;
    display: flex;
    gap: ${theme.spacing(5)};
    flex-direction: column;
    padding: ${theme.spacing(3)} ${theme.spacing(8)};

    ${theme.breakpoints.up("md")} {
      gap: ${theme.spacing(15)};
      flex-direction: row;
      padding: ${theme.spacing(5)} ${theme.spacing(20)};
    }
  `
);
