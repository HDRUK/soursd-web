import type { Meta, StoryObj } from "@storybook/react";

import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import GuidanceDrawer from ".";

const meta = {
  title: "components/GuidanceDrawer",
  component: GuidanceDrawer,
  tags: ["autodocs"],
} satisfies Meta<typeof GuidanceDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...mockedPersonalDetailsGuidanceProps,
    children: "john.smith@hdruk.ac.uk",
  },
};
