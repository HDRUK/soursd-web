import type { Meta, StoryObj } from "@storybook/nextjs";

import IconButton from ".";

const meta = {
  title: "components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    loading: false,
  },
};
