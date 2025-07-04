import type { Meta, StoryObj } from "@storybook/nextjs";

import { Lock } from "@mui/icons-material";
import ImageDecorator from ".";

const meta = {
  title: "components/ImageDecorator",
  component: ImageDecorator,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageDecorator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <Lock />,
  },
};
