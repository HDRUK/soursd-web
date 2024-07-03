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
      const { isNotInfected, isScanning } = useFileScanned(latestCV);

      const { refetch: refetchUser, cancel: refetchCancel } = useQueryRefetch({
        options: { queryKey: ["getUser", user.id] },
      });

      useEffect(() => {
        if (isFileScanning(latestCV)) {
          refetchUser();
        } else {
          refetchCancel();
        }
      }, [JSON.stringify(latestCV)]);
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
