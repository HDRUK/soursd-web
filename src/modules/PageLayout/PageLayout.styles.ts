import { styled } from "@mui/material";

export const StyledPageLayout = styled("div")(`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 8px;
`);
