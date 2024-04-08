import { Button } from "@mui/material";
import { CarouselSlideProps } from "./CarouselSlide";

export const mockedCarouselSlides: CarouselSlideProps[] = [
  {
    title: "Feature 1",
    description: "Feature 1 description",
    button: (
      <Button color="secondary" variant="contained" size="small">
        Find out more
      </Button>
    ),
    backgroundImage: "/feature.banner.test.jpg",
  },
  {
    title: "Feature 2",
    description: "Feature 2 description",
    button: (
      <Button color="secondary" variant="contained" size="small">
        Find out more
      </Button>
    ),
    backgroundImage: "/feature.banner.test.jpg",
  },
];
