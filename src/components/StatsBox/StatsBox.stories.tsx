import type { Meta, StoryObj } from "@storybook/react";

import { Mail } from "@mui/icons-material";
import StatsBox from ".";

const meta = {
  title: "components/StatsBox",
  component: StatsBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatsBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    value: "162,000",
    description: "Researchers Registered",
    icon: <Mail />,
    footer: "Last update 22/10/2024",
    color: "default",
    elevation: 3,
  },
};
