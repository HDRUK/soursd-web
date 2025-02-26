import type { Meta, StoryObj } from "@storybook/react";

import { mockedPermission } from "@/mocks/data/permission";
import AssignOptions from "./AssignOptions";

const meta = {
  title: "components/AssignOptions",
  component: AssignOptions,
  tags: ["autodocs"],
} satisfies Meta<typeof AssignOptions>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockedPermission1 = mockedPermission({ id: 1 });
const mockedPermission2 = mockedPermission({ id: 2 });
const mockedPermission3 = mockedPermission({ id: 3 });
const mockedPermission4 = mockedPermission({ id: 4 });

export const Basic: Story = {
  args: {
    onSubmit: () => {},
    queryState: {
      isLoading: false,
      isError: false,
      error: "",
    },
    parentData: [
      mockedPermission1,
      mockedPermission2,
      mockedPermission3,
      mockedPermission4,
    ],
    subsetData: [mockedPermission1, mockedPermission2, mockedPermission4],
  },
};
