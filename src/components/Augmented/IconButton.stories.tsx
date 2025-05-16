import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "@mui/material";
import { Mail as MailIcon } from "@mui/icons-material";
import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";

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
