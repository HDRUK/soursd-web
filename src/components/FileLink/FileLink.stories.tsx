import type { Meta, StoryObj } from "@storybook/react";

import FileLink from ".";

const meta = {
  title: "components/FileLink",
  component: FileLink,
  tags: ["autodocs"],
} satisfies Meta<typeof FileLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotUploaded: Story = {
  args: {
    onFileChange: () => {},
    fileButtonText: "Upload",
    includeStatus: true,
    isScanComplete: false,
    isScanFailed: false,
    isScanning: false,
  },
};

export const Uploaded: Story = {
  args: {
    onFileChange: () => {},
    fileButtonText: "Upload",
    fileNameText: "sample.cv.doc",
    fileHref: "/path",
    includeStatus: true,
    isScanComplete: true,
    isScanFailed: false,
    isScanning: false,
  },
};
