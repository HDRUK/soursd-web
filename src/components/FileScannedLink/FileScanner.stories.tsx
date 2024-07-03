import type { Meta, StoryObj } from "@storybook/react";

import FileScannedLink from ".";

const meta = {
  title: "components/FileScannedLink",
  component: FileScannedLink,
  tags: ["autodocs"],
} satisfies Meta<typeof FileScannedLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    href: "",
    onFileChange: () => {},
    isUploading: false,
    fileName: "cv.doc",
    isSizeTooBig: false,
    isScanning: false,
    isOk: true,
    messages: {
      fileButtonUpload: "Upload file",
      fileDownload: "Download file",
      fileInputLabel: "Select file",
      fileMaxSize: "10Mb",
      fileMaxSizeError: "File is too big",
      fileScanError: "File was infected",
      fileScanning: "Scanning file",
      fileScanOk: "File is ok",
    },
  },
};
