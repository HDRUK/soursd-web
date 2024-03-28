import { css, styled } from "@mui/material";

export const StyledFormPersonalDetails = styled("div")(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing(2)};
    flex-grow: 1;

    & > div {
      flex-grow: 1;
    }
  `
);

export const StyledForm = styled("form")(
  ({ theme }) => css`
    flexgrow: 1;
    display: flex;
    gap: ${theme.spacing(2)};
    flex-direction: column;
    max-width: 458px;
  `
);
