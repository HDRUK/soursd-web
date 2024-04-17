import { css, styled } from "@mui/material";

export const StyledHomepageStats = styled("div")(
  ({ theme }) => css`
    margin: 0 auto;
    max-width: 740px;
    display: flex;
    gap: ${theme.spacing(1)};
    flex-wrap: wrap;
    justify-content: center;

    & > * {
      flex: 1 1 33.3333%;
      max-width: 240px;
    }
  `
);
