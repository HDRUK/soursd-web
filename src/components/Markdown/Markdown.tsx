import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import FormControlDescription from "../FormControlDescription";

interface MarkdownProps {
  children: string;
  components?: Components;
  variant?: "plain" | "subtitle";
}

const subtitleComponents: Components = {
  p({ children }) {
    return <FormControlDescription>{children}</FormControlDescription>;
  },
};

const defaultComponents: Components = {
  h3({ node: _node, children, ...rest }) {
    return (
      <h3 style={{ fontWeight: "normal" }} {...rest}>
        {children}
      </h3>
    );
  },
};

export default function Markdown({
  children,
  variant = "plain",
  ...props
}: MarkdownProps) {
  const selectedComponents =
    variant === "subtitle"
      ? { ...defaultComponents, ...subtitleComponents }
      : { ...defaultComponents };

  return (
    <ReactMarkdown components={selectedComponents} {...props}>
      {children}
    </ReactMarkdown>
  );
}
