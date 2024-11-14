import { Meta, StoryObj } from "@storybook/react";
import SourcdLogo from "./SourcdLogo";

const meta: Meta<typeof SourcdLogo> = {
  title: "Components/SourcdLogo",
  component: SourcdLogo,
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SourcdLogo>;

export const Default: Story = {
  args: {
    className: "", // Default, no additional class
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "custom-class",
  },
};
