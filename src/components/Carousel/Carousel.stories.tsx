import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@mui/material";
import { Carousel, CarouselSlide } from ".";
import { mockedCarouselSlides } from "./mockData";

const meta = {
  title: "components/Carousel",
  component: Carousel,
  decorators: [
    Story => (
      <Box px={2} minHeight="150px">
        <Story />
      </Box>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [],
  },
  render: props => (
    <Carousel sx={{ height: "150px" }} {...props}>
      <CarouselSlide backgroundTransparencyColor="primary">
        Slide 1
      </CarouselSlide>
      <CarouselSlide backgroundTransparencyColor="secondary">
        Slide 2
      </CarouselSlide>
    </Carousel>
  ),
};

export const Hero: Story = {
  args: {
    children: [],
    variant: "hero",
  },
  render: props => (
    <Carousel {...props}>
      {mockedCarouselSlides.map(carouselSlideProps => (
        <CarouselSlide {...carouselSlideProps} />
      ))}
    </Carousel>
  ),
};
