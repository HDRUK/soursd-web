"use client";

import { Typography, Button } from "@mui/material";
import image1 from "public/images/homepage/Image1.png";
import image2 from "public/images/homepage/Image2.png";

import Image from "next/image";

import { framerHover } from "@/utils/framer";
import { StyledContent, StyledContainer, StyledGrid } from "./Support.styles";

export default function Support() {
  return (
    <StyledContent>
      <Typography variant="h2" sx={{ mb: "50px" }}>
        Support
      </Typography>
      <StyledGrid>
        <StyledContainer {...framerHover}>
          <Image src={image1} alt="image_1" width={300} height={160} />
          <Button variant="contained" color="secondary" sx={{ margin: "20px" }}>
            Individuals
          </Button>
        </StyledContainer>
        <StyledContainer {...framerHover}>
          <Image src={image1} alt="image_2" width={300} height={160} />
          <Button variant="contained" sx={{ margin: "20px" }}>
            Organisations
          </Button>
        </StyledContainer>
        <StyledContainer {...framerHover}>
          <Image src={image2} alt="image_3" width={300} height={160} />
          <Button variant="contained" color="secondary" sx={{ margin: "20px" }}>
            Data Custodians
          </Button>
        </StyledContainer>
      </StyledGrid>
    </StyledContent>
  );
}
