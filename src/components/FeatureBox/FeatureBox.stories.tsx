import type { Meta, StoryObj } from "@storybook/react";

import { Box, Typography } from "@mui/material";
import { FeatureBox, FeatureBoxContent, FeatureBoxInfo } from ".";
import Quote from "../Quote";

const meta = {
  title: "components/FeatureBox",
  component: FeatureBox,
  tags: ["autodocs"],
  decorators: [
    Story => (
      <Box px={2} maxWidth="800px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof FeatureBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    elevation: 3,
    color: "primary",
  },
  render: props => (
    <FeatureBox {...props}>
      <FeatureBoxInfo>
        <Typography variant="h5">Title</Typography>
      </FeatureBoxInfo>
      <FeatureBoxContent>
        <Quote>Researcher quote goes here</Quote>
      </FeatureBoxContent>
    </FeatureBox>
  ),
};
