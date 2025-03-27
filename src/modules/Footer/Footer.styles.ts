import { Box, css, styled } from "@mui/material";

const StyledFooter = styled("div")(
  ({ theme }) => css`
    width: 100%;
    position: relative;
    color: #fff;
    display: flex;
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(2)} ${theme.spacing(8)} ${theme.spacing(3)};
    flex-direction: column;
    align-items: flex-start;

    ${theme.breakpoints.up("md")} {
      flex-direction: row;
      gap: ${theme.spacing(9)};
      padding: ${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(5)};
      align-items: flex-end;
    }
  `
);

const StyledBox = styled(Box)(
  ({ theme }) => css`
    align-items: flex-end;
    display: flex;

    ${theme.breakpoints.down("sm")} {
      flex-wrap: wrap;
    }
  `
);

export { StyledFooter, StyledBox };
