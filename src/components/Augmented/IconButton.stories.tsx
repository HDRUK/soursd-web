import type { Meta, StoryObj } from "@storybook/react";

import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "@/consts/storybook";
import { IconButton } from "@mui/material";
import { Mail as MailIcon } from "@mui/icons-material";

const meta = {
  title: "Mui augmented/IconButton",
  component: IconButton,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    color: "primary",
    edge: "start",
    variant: "contained",
    children: <MailIcon />,
  },
};
