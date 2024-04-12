import { AugmentedColorPaletteOptions } from "@/types/theme";
import { Box, IconButton, Theme, css, styled } from "@mui/material";

export const StyledCarousel = styled("div")(
  ({ variant }: { variant: "hero" | "default" }) => css`
    position: relative;

    .slick-slider,
    .slick-list,
    .slick-track,
    .slick-slide,
    .slick-slide > div {
      height: 100%;
    }

    .slick-arrow {
      display: none !important;
    }

    .slick-slide {
      > div {
        padding: 0 3px;
        position: relative;

        ${variant === "hero" &&
        `
        padding: 65px 80px;
      `}
      }
    }
  `
);

export const StyledCarouselSlide = styled(Box)(
  ({
    theme,
    backgroundTransparencyColor,
  }: {
    theme: Theme;
    backgroundTransparencyColor?: AugmentedColorPaletteOptions;
  }) => css`
    height: 100%;
    overflow: hidden;

    ${backgroundTransparencyColor &&
    `&:before {
      content: "";
      background: ${theme.palette[backgroundTransparencyColor].main};
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    `}
  `
);

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

export const StyledBackgroundImage = styled("div")(
  ({ backgroundImage }: { backgroundImage: string }) => css`
    top: 0;
    left: 0;
    position: absolute;
    background-image: url("${backgroundImage}");
    width: 100%;
    height: 100%;
    background-size: cover;
    opacity: 0.2;
  `
);
