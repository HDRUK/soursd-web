"use client";

import { Typography } from "@mui/material";
import { mockedSoursdHomepageUsages } from "@/mocks/data/cms";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { framerFadeIn } from "@/utils/framer";
import {
  StyledOuterContent,
  StyledContent,
  StyledContainer,
  StyledGrid,
  StyledBox,
} from "./SoursdUsages.styles";

export default function SoursdUsages() {
  return (
    <StyledOuterContent>
      <StyledContainer>
        <StyledContent>
          {mockedSoursdHomepageUsages.infoHeader}
          <StyledGrid>
            <StyledBox
              {...framerFadeIn}
              transition={{ ...framerFadeIn.transition, delay: 0 }}>
              <TrendingUpIcon color="white" fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: "500", marginLeft: "10px", textAlign: "left" }}>
                Accelerate ‘Safe People’ data access
              </Typography>
            </StyledBox>
            <StyledBox
              {...framerFadeIn}
              transition={{ ...framerFadeIn.transition, delay: 0.5 }}>
              <FastForwardOutlinedIcon color="white" fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: "500", marginLeft: "10px", textAlign: "left" }}>
                Reduce duplication of effort for Users and Organisations
              </Typography>
            </StyledBox>
            <StyledBox
              {...framerFadeIn}
              transition={{ ...framerFadeIn.transition, delay: 1 }}>
              <GppGoodOutlinedIcon color="white" fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: "500", marginLeft: "10px", textAlign: "left" }}>
                Enable shared intelligence across Data Custodians
              </Typography>
            </StyledBox>
          </StyledGrid>
        </StyledContent>
      </StyledContainer>
    </StyledOuterContent>
  );
}
