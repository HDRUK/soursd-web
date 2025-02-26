"use client";

import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { AugmentedColorPaletteOptions } from "@mui/material/styles/createPalette";
import { ReactNode } from "react";
import { StyledBackgroundImage, StyledCarouselSlide } from "./Carousel.styles";

export interface CarouselSlideProps extends BoxProps {
  heading?: ReactNode;
  description?: ReactNode;
  button?: ReactNode;
  backgroundImage?: string;
  backgroundTransparencyColor?: AugmentedColorPaletteOptions;
}

export default function CarouselSlide({
  backgroundImage,
  heading,
  description,
  children,
  button,
  ...restProps
}: CarouselSlideProps) {
  const theme = useTheme();

  return (
    <StyledCarouselSlide theme={theme} {...restProps}>
      {backgroundImage && (
        <StyledBackgroundImage backgroundImage={backgroundImage} />
      )}
      <Box sx={{ position: "relative" }}>
        {heading && (
          <Typography variant="h5" color="white">
            {heading}
          </Typography>
        )}
        {description && (
          <Typography color="white" sx={{ maxWidth: { md: "50%" }, mb: 2 }}>
            {description}
          </Typography>
        )}
        {children}
        {button}
      </Box>
    </StyledCarouselSlide>
  );
}
