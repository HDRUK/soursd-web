"use client";

import { Typography } from "@mui/material";
import { mockedSoursdHomepageUsages } from "@/mocks/data/cms";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { framerFadeIn } from "@/utils/framer";
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
          <StyledBox
            {...framerFadeIn}
            transition={{ ...framerFadeIn.transition, delay: 0 }}>
            <DoneAllOutlinedIcon color="primary" />
            <Typography variant="subtitle1" mb={3} sx={{ marginLeft: "10px" }}>
              Accelerate ‘Safe People’ data access
            </Typography>
          </StyledBox>
          <StyledBox
            {...framerFadeIn}
            transition={{ ...framerFadeIn.transition, delay: 0.5 }}>
            <DoneAllOutlinedIcon color="primary" />
            <Typography variant="subtitle1" mb={3} sx={{ marginLeft: "10px" }}>
              Reduce duplication of effort for Users and Organisations
            </Typography>
          </StyledBox>
          <StyledBox
            {...framerFadeIn}
            transition={{ ...framerFadeIn.transition, delay: 1 }}>
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
