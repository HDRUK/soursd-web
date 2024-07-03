import type { StoryObj } from "@storybook/react";

import SyntaxHighlighter from "react-syntax-highlighter";

const VirusScanning = () => {
  const codeString = `
    const Profile = () => {
      const {
        data
      } = useQuery(
        ["getUser", "123"],
        async ({ queryKey }) => {
          const [, id] = queryKey;

          return getUser(id, {
            error: {
              message: "submitError",
            },
          });
      );

      const firstFile = data.registry.files[0];

      return <File data={firstFile} />
    }

    const File = ({ data }) => {
      const { isNotInfected, isScanning } = useFileScanned(data);

      const { refetch: refetchUser } = useQueryRefetch(
        {
          // Must be used or it will continue to poll
          cancel: (value: string) => {
            return value !== FileStatus.PENDING;
          },
          options: { queryKey: ["getUser", "123"] },
        },
        data.status
      );
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
