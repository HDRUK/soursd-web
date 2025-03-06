import type { Meta, StoryObj } from "@storybook/react";

import { mockedVerifications } from "@/mocks/data/static";
import ActionsPanelValidationChecks from "./ActionsPanelValidationChecks";

const meta = {
  title: "components/ActionsPanelValidationChecks",
  component: ActionsPanelValidationChecks,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionsPanelValidationChecks>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicStory = () => {
  return mockedVerifications();
};

export const Basic: Story = {
  render: () => <BasicStory />,
  args: {},
};
