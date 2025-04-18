"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { BoxProps, IconButtonProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode, useCallback, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import { StyledCarousel, StyledIconButton } from "./Carousel.styles";

export interface CarouselProps extends BoxProps {
  children: ReactNode[];
  arrowProps?: IconButtonProps;
  height?: string;
  settings?: Settings;
  showArrows?: boolean;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  variant?: "hero" | "basic";
}

export default function Carousel({
  children,
  showArrows = true,
  arrowProps,
  prevIcon,
  nextIcon,
  settings,
  variant = "basic",
  ...restProps
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0 || settings?.initialSlide);
  const slideRef = useRef<Slider>(null);
  const t = useTranslations("Carousel");

  const handlePrevClick = useCallback(() => {
    slideRef.current?.slickPrev();
  }, []);

  const handleNextClick = useCallback(() => {
    slideRef.current?.slickNext();
  }, []);

  const defaultSettings = {
    speed: 500,
    initialSlide: 0,
    swipeToSlide: true,
    infinite: true,
    beforeChange: (index: number) => {
      setCurrentIndex(index);
    },
    ...settings,
  };

  return (
    <StyledCarousel variant={variant} {...restProps}>
      {showArrows && (
        <StyledIconButton
          variant="contained"
          {...arrowProps}
          onClick={handlePrevClick}
          disabled={currentIndex === 0 && !defaultSettings.infinite}
          sx={{
            left: "20px",
          }}
          aria-label={t("previous")}>
          {prevIcon || <ChevronLeft />}
        </StyledIconButton>
      )}
      <Slider {...defaultSettings} ref={slideRef}>
        {children}
      </Slider>
      {showArrows && (
        <StyledIconButton
          variant="contained"
          {...arrowProps}
          onClick={handleNextClick}
          disabled={
            currentIndex === children.length - 1 && !defaultSettings.infinite
          }
          sx={{
            right: "20px",
          }}
          aria-label={t("next")}>
          {nextIcon || <ChevronRight />}
        </StyledIconButton>
      )}
    </StyledCarousel>
  );
}
