import type { StoryObj } from "@storybook/nextjs";

import SyntaxHighlighter from "react-syntax-highlighter";

const ResponsiveProps = () => {
  const codeString = `
    export interface WrappingComponentBaseProps {
      variant: "vertical" | "horizontal";
    }

    export type WrappingComponentProps = WrappingComponentBaseProps & {
      responsiveProps: ResponsiveProps<WrappingComponentBaseProps>;
    };


    export default function WrappingComponent({ responsiveProps }: WrappingComponentProps) {
      const props = useResponsiveProps(responsiveProps);
      const currentVariant = props.variant || variant;

      <Component variant={currentVariant} />
    }

    <WrappingComponent variant={{
      xs: 'vertical',
      md: 'horizontal'
    }} />
  `;

  return (
    <SyntaxHighlighter language="typescript">{codeString}</SyntaxHighlighter>
  );
};

const meta = {
  title: "recipes/Responsive props",
  component: ResponsiveProps,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
