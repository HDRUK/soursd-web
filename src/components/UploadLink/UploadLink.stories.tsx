import type { Meta, StoryObj } from "@storybook/react";

import UploadLink from ".";

const meta = {
  title: "components/UploadLink",
  component: UploadLink,
  tags: ["autodocs"],
} satisfies Meta<typeof UploadLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotUploaded: Story = {
  args: {
    onUpload: () => {},
    fileName: "",
    fileNamePlaceholder: "[Upload CV]",
    maxSize: "10(Mb) max",
    linkProps: {
      href: "/",
      title: "Download cv",
    },
  },
};

export const Uploaded: Story = {
  args: {
    onUpload: () => {},
    fileName: "sample.cv.doc",
    fileNamePlaceholder: "",
    maxSize: "10(Mb) max",
    linkProps: {
      href: "/",
      title: "Download cv",
    },
  },
};
