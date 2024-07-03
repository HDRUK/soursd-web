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
    fileName: "",
    fileNamePlaceholder: "[Upload CV]",
    maxSizeLabel: "10(Mb) max",
    linkProps: {
      href: "/",
      title: "Download cv",
    },
  },
};

export const Uploaded: Story = {
  args: {
    onFileChange: () => {},
    fileName: "sample.cv.doc",
    fileNamePlaceholder: "",
    maxSizeLabel: "10(Mb) max",
    linkProps: {
      href: "/",
      title: "Download cv",
    },
  },
};
