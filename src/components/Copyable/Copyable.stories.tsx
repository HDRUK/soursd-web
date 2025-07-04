import type { Meta, StoryObj } from "@storybook/nextjs";

import Copyable from ".";

const meta = {
  title: "components/Copyable",
  component: Copyable,
  tags: ["autodocs"],
} satisfies Meta<typeof Copyable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Click here to copy",
  },
};
