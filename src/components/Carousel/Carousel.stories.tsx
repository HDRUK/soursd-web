import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@mui/material";
import { Carousel, CarouselSlide } from ".";
import { mockedCarouselSlides } from "./mockData";

const meta = {
  title: "components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [],
  },
  render: props => (
    <Box
      sx={{
        height: "150px",
        maxWidth: "900px",
        width: "calc(100vw - 72px)",
      }}>
      <Carousel sx={{ height: "100%" }} {...props}>
        <CarouselSlide backgroundTransparencyColor="primary">
          Slide 1
        </CarouselSlide>
        <CarouselSlide backgroundTransparencyColor="secondary">
          Slide 2
        </CarouselSlide>
      </Carousel>
    </Box>
  ),
};

export const Hero: Story = {
  args: {
    children: [],
    variant: "hero",
  },
  render: props => (
    <Box
      sx={{
        height: "300px",
        width: "calc(100vw - 72px)",
        maxWidth: "900px",
      }}>
      <Carousel {...props}>
        {mockedCarouselSlides.map(carouselSlideProps => (
          <CarouselSlide {...carouselSlideProps} />
        ))}
      </Carousel>
    </Box>
  ),
};
