import type { Meta, StoryObj } from "@storybook/react";

import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "@/consts/storybook";
import { Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import StatsBox from ".";

const meta = {
  title: "components/StatsBox",
  component: StatsBox,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  decorators: [
    Story => (
      <Box px={2} maxWidth="300px">
        <Story />
      </Box>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof StatsBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: "162,000",
    description: "Researchers Registered",
    icon: <Person />,
    footer: "Last update 22/10/2024",
    color: "default",
    elevation: 3,
  },
};
