import type { Meta, StoryObj } from "@storybook/react";

import { mockedVerifications } from "@/mocks/data/static";
import ActionsPanelValidationCheck from "./ActionsPanelValidationCheck";

const meta = {
  title: "components/ActionsPanelValidationCheck",
  component: ActionsPanelValidationCheck,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionsPanelValidationCheck>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicStory = () => {
  return mockedVerifications();
};

export const Basic: Story = {
  render: () => <BasicStory />,
  args: {},
};
