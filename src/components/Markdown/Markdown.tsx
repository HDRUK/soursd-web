import React from "react";
import ReactMarkdown, { Components } from "react-markdown";

interface MarkdownProps {
  children: string;
}

const customComponents: Components = {
  h3({ node: _node, children, ...rest }) {
    return (
      <h3 style={{ fontWeight: "normal" }} {...rest}>
        {children}
      </h3>
    );
  },
};

export default function Markdown({ children, ...props }: MarkdownProps) {
  return (
    <ReactMarkdown components={customComponents} {...props}>
      {children}
    </ReactMarkdown>
  );
}
