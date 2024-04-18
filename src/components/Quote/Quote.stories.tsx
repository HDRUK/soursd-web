import type { Meta, StoryObj } from "@storybook/react";

import Quote from ".";

const meta = {
  title: "components/Quote",
  component: Quote,
  tags: ["autodocs"],
} satisfies Meta<typeof Quote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Comments made by user go here",
    elevation: 3,
  },
};
