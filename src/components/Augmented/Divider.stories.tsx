import type { Meta, StoryObj } from "@storybook/nextjs";

import { Divider } from "@mui/material";
import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";

const meta = {
  title: "Mui augmented/Divider",
  component: Divider,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    color: "primary",
    gradient: true,
  },
};
