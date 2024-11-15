"use client";

import { Typography, Button } from "@mui/material";
import { StyledContent, StyledContainer, StyledGrid } from "./Support.styles";

export default function Support() {
  return (
    <StyledContainer>
      <StyledContent>
        <Typography variant="h2" sx={{ mb: "50px" }}>
          Support
        </Typography>
        <StyledGrid>
          <Button variant="contained" color="secondary">
            Individuals
          </Button>
          <Button variant="contained">Organisations</Button>
          <Button variant="contained" color="secondary">
            Data Custodians
          </Button>
        </StyledGrid>
      </StyledContent>
    </StyledContainer>
  );
}
