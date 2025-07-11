import type { Meta, StoryObj } from "@storybook/react";

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
    description:
      "This ‘key’ represents you as an Organisation within Safe People Registry. This is unique to you! Your Organisation will have a unique Safe People Registry identifier associated with your account once your Organisation profile has been completed. This persistent unique identifier will be used to notify Data Custodians of any key changes to your Organisation profile that may impact data access decisions.",
  },
};
