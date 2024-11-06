import { Button } from "@mui/material";
import { CarouselSlideProps } from "./CarouselSlide";

export const mockedCarouselSlides: CarouselSlideProps[] = [
  {
    heading: "Feature 1",
    description: "Feature 1 description",
    button: (
      <Button color="secondary" variant="contained" size="small">
        Find out more
      </Button>
    ),
    backgroundImage: "/feature.banner.test.jpg",
    backgroundTransparencyColor: "background",
  },
  {
    heading: "Feature 2",
    description: "Feature 2 description",
    button: (
      <Button color="secondary" variant="contained" size="small">
        Find out more
      </Button>
    ),
    backgroundImage: "/feature.banner.test.jpg",
    backgroundTransparencyColor: "background",
  },
];
