import { Meta, StoryObj } from "@storybook/nextjs";
import SoursdLogo from "./SoursdLogo";

const meta: Meta<typeof SoursdLogo> = {
  title: "Components/SoursdLogo",
  component: SoursdLogo,
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SoursdLogo>;

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
