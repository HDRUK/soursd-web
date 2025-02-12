import type { StoryObj } from "@storybook/react";

import SyntaxHighlighter from "react-syntax-highlighter";

const VirusScanning = () => {
  const codeString = `
    const Profile = () => {
      const {
        upload,
        isScanComplete,
        isScanFailed,
        isScanning,
        isSizeInvalid,
        isUploading,
        file
      } = useFileUpload();

      const handleFileChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
          const file = getFileFromEvent(e);

          if (file) {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("file_type", FileType.RESEARCHER_LIST);
            formData.append("organisation_id", 1);

            upload(formData);
          }
        },
        []
      );

      return file.name;
  }
  `;

  return (
    <SyntaxHighlighter language="typescript">{codeString}</SyntaxHighlighter>
  );
};

const meta = {
  title: "recipes/Virus scanning",
  component: VirusScanning,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
