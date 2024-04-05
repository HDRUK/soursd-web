import { IconButton, css, styled } from "@mui/material";

export const StyledCarousel = styled("div")`
  position: relative;

  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div {
    height: 100%;
  }
`;

export const StyledCarouselSlide = styled("div")(
  ({ theme }) => css`
  padding: 65px 80px;
  height: 100%;
  position: relative;
  background: ${theme.palette.backgroundBlue};
  overflow: hidden;

  :before,
  :after {
    content: "";
    position: absolute;
    right: -200px;
    left: -200px;
    transform: rotate(-5deg);
  }

  :before {
    height: 10px;
    background-color: #fff;
    bottom: 20px;
    box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2);
    z-index: 1;
  }

  :after {
    height: 120px;
    background-color: ${theme.palette.grey["200"]};
    bottom: -100px;
  }
}}
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
