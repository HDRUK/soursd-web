"use client";

import { Typography, Button } from "@mui/material";
import image1 from "public/images/homepage/Image1.png";
import image2 from "public/images/homepage/Image2.png";

import Image from "next/image";

import { StyledContent, StyledContainer, StyledFlex } from "./Support.styles";

export default function Support() {
  return (
    <StyledContent>
      <Typography variant="h3" sx={{ mb: "24px" }}>
        Support
      </Typography>
      <StyledFlex width="100%">
        <StyledContainer>
          <Image
            src={image1}
            alt="image_1" 
            width={0} 
            height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
          <Button variant="outlined" sx={{ padding: "16px", my: "12px", fontSize: "small" }}>
            Individual Users
          </Button>
        </StyledContainer>
        <StyledContainer>
          <Image src={image1} alt="image_2" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
          <Button variant="outlined" sx={{ padding: "16px", my: "12px", fontSize: "small" }}>
            Organisations
          </Button>
        </StyledContainer>
        <StyledContainer>
          <Image src={image2} alt="image_3" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
          <Button variant="outlined" sx={{ padding: "16px", my: "12px", fontSize: "small" }}>
            Data Custodians
          </Button>
        </StyledContainer>
      </StyledFlex>
    </StyledContent>
  );
}
