import type { Meta, StoryObj } from "@storybook/react";

import FormRecaptcha from "./FormRecaptcha";

const meta = {
  title: "components/FormRecaptcha",
  component: FormRecaptcha,
  tags: ["autodocs"],
} satisfies Meta<typeof FormRecaptcha>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    error: "You need to prove you are not a robot",
  },
};
