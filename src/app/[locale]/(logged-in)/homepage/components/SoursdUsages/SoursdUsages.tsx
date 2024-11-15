"use client";

import { Typography } from "@mui/material";
import { mockedSoursdHomepageUsages } from "@/mocks/data/cms";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import {
  StyledContent,
  StyledContainer,
  StyledGrid,
  StyledBox,
} from "./SoursdUsages.styles";

export default function SoursdUsages() {
  return (
    <StyledContainer>
      <StyledContent>
        {mockedSoursdHomepageUsages.infoHeader}
        <StyledGrid>
          <StyledBox sx={{ display: "flex" }}>
            <DoneAllOutlinedIcon color="primary" />
            <Typography variant="subtitle1" mb={3} sx={{ marginLeft: "10px" }}>
              Accelerate ‘Safe People’ data access
            </Typography>
          </StyledBox>
          <StyledBox>
            <DoneAllOutlinedIcon color="primary" />
            <Typography variant="subtitle1" mb={3} sx={{ marginLeft: "10px" }}>
              Reduce duplication of effort for Users and Organisations
            </Typography>
          </StyledBox>
          <StyledBox>
            <DoneAllOutlinedIcon color="primary" />
            <Typography variant="subtitle1" mb={3} sx={{ marginLeft: "10px" }}>
              Enable shared intelligence across Data Custodians
            </Typography>
          </StyledBox>
        </StyledGrid>
      </StyledContent>
    </StyledContainer>
  );
}
