import type { Meta, StoryObj } from "@storybook/react";

import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "@/consts/storybook";
import Postit from ".";
import SoursdCard from ".";
import { Status } from "../ChipStatus";

const meta = {
  title: "components/SoursdCard",
  component: SoursdCard,
  tags: ["autodocs"],
} satisfies Meta<typeof SoursdCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    status: Status.PENDING,
    name: "Health Data Research",
    identifier: "kYBp5K52M5zIoTKtL785UpWgVCsjFZcbxYlKVX5C",
    children:
      "This ‘key’ represents you as an Organisation within SOURSD. This is unique to you! Your Organisation will have a unique SOURSD identifier associated with your account once your Organisation profile has been completed. This persistent unique identifier will be used to notify Data Custodians of any key changes to your Organisation profile that may impact data access decisions.",
  },
};
