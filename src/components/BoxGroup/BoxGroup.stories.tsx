import type { Meta, StoryObj } from "@storybook/react";

import BoxGroup from ".";
import Quote from "../Quote";

const meta = {
  title: "components/BoxGroup",
  component: BoxGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BoxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: props => (
    <BoxGroup {...props}>
      <Quote>Researcher quote goes here</Quote>
      <Quote>Researcher quote goes here</Quote>
      <Quote>Researcher quote goes here</Quote>
    </BoxGroup>
  ),
};
