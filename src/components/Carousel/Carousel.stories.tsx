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
        height: "300px",
        width: "calc(100vw - 32px)",
      }}>
      <Carousel {...props}>
        {mockedCarouselSlides.map(carouselSlideProps => (
          <CarouselSlide {...carouselSlideProps} />
        ))}
      </Carousel>
    </Box>
  ),
};
