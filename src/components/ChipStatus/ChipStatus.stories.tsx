import type { Meta, StoryObj } from "@storybook/react";

import ChipStatus from ".";

const meta = {
  title: "components/ChipStatus",
  component: ChipStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof ChipStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    status: "invited",
  },
};
