"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { StyledBackgroundImage, StyledCarouselSlide } from "./Carousel.styles";

export interface CarouselSlideProps {
  title: ReactNode;
  description: ReactNode;
  button?: ReactNode;
  backgroundImage?: string;
}

export default function CarouselSlide({
  backgroundImage,
  title,
  description,
  button,
}: CarouselSlideProps) {
  return (
    <StyledCarouselSlide>
      {backgroundImage && (
        <StyledBackgroundImage backgroundImage={backgroundImage} />
      )}
      <Typography variant="h5" color="white">
        {title}
      </Typography>
      <Typography color="white" sx={{ maxWidth: { md: "50%" }, mb: 2 }}>
        {description}
      </Typography>
      {button}
    </StyledCarouselSlide>
  );
}
