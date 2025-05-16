import type { Meta, StoryObj } from "@storybook/react";

import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";
import { Card, CardContent } from "@mui/material";

const meta = {
  title: "Mui augmented/Card",
  component: Card,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        fringilla egestas enim sed malesuada. Vivamus molestie justo in massa
        auctor, non dignissim tellus feugiat. Curabitur vestibulum magna in
        velit commodo faucibus. Morbi vulputate neque volutpat consectetur
        faucibus. Mauris posuere in mi et vestibulum. Sed neque arcu, ultricies
        tristique leo vitae, vestibulum tempor leo. Sed in ultricies est, vitae
        tempus risus. Sed mi augue, accumsan id ex sit amet, vulputate euismod
        mauris. Donec pharetra ac quam nec luctus. Curabitur ac justo vel urna
        tempor scelerisque. Suspendisse ac hendrerit urna. Proin mollis sapien
        eleifend tellus ultricies, vitae venenatis diam rhoncus. Nulla aliquet
        dolor nisi, quis lacinia nisi rhoncus eu. Fusce euismod velit mi, vitae
        tristique elit gravida sit amet. Mauris nisi purus, gravida vel
        fringilla in, rhoncus a urna. Morbi tortor elit, pretium eu aliquet
        vitae, mollis in ex.
      </CardContent>
    ),
  },
};
