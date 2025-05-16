import type { Meta, StoryObj } from "@storybook/react";

import { Step, StepButton, Stepper } from "@mui/material";
import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";

const meta = {
  title: "Mui augmented/Stepper",
  component: Stepper,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    activeStep: 1,
  },
  render: props => (
    <Stepper {...props}>
      <Step>
        <StepButton>Personal details</StepButton>
      </Step>
      <Step>
        <StepButton>Documents</StepButton>
      </Step>
      <Step>
        <StepButton>Confirm</StepButton>
      </Step>
    </Stepper>
  ),
};
