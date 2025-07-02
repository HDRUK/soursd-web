import type { Meta, StoryObj } from "@storybook/nextjs";

import { Box, Typography } from "@mui/material";
import { FeatureBox, FeatureBoxContent, FeatureBoxInfo } from ".";
import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";

const meta = {
  title: "components/FeatureBox",
  component: FeatureBox,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
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
  args: {},
  render: props => (
    <FeatureBox {...props}>
      <FeatureBoxInfo>
        <Typography variant="h5">Title</Typography>
      </FeatureBoxInfo>
      <FeatureBoxContent>Content goes here</FeatureBoxContent>
    </FeatureBox>
  ),
};
