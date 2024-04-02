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
    display: flex;
    gap: ${theme.spacing(2)};
    flex-direction: column;

    .MuiOutlinedInput-root input {
      color: #fff;
    }

    .MuiOutlinedInput-root:not(.Mui-error):hover
      .MuiOutlinedInput-notchedOutline,
    .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline {
      border-color: #fff;
    }
  `
);
