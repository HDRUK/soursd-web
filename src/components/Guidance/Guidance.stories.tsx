import type { Meta, StoryObj } from "@storybook/nextjs";

import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import Guidance from ".";

const meta = {
  title: "components/Guidance",
  component: Guidance,
  tags: ["autodocs"],
} satisfies Meta<typeof Guidance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...mockedPersonalDetailsGuidanceProps,
    children: "john.smith@hdruk.ac.uk",
  },
};
