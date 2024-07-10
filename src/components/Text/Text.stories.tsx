import type { Meta, StoryObj } from "@storybook/react";

import { CircularProgress } from "@mui/material";
import Text from ".";

const meta = {
  title: "components/Text",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "I am loading",
    endIcon: <CircularProgress size="1em" />,
  },
};
