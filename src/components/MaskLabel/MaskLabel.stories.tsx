import type { Meta, StoryObj } from "@storybook/react";

import MaskLabel from "./MaskLabel";

const meta = {
  title: "components/MaskLabel",
  component: MaskLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof MaskLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { initials: "JS", label: "john.smith@gmail.com" },
};
