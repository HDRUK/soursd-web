import type { StoryObj } from "@storybook/react";

import SyntaxHighlighter from "react-syntax-highlighter";

const Notifications = () => {
  const codeString = `
    const TestComponent = () => {
      const { error, add, remove } = useNotifications(["TEST"]);

      const handleAdd = () => {
        add(NotificationsTypes.ERROR, "TEST", "There has been an error");
      };

      const handleRemove = () => {
        remove(NotificationsTypes.ERROR, "TEST");
      };

      return (
        <div>
          {error.TEST && <Message severity="error">{error.TEST}</Message>}
          <button type="button" onClick={handleAdd}>
            Add
          </button>
          <button type="button" onClick={handleRemove}>
            Remove
          </button>
        </div>
      );
    };
  `;

  return (
    <SyntaxHighlighter language="typescript">{codeString}</SyntaxHighlighter>
  );
};

const meta = {
  title: "recipes/Notifications",
  component: Notifications,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
