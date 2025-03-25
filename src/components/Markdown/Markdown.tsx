import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Typography } from "@mui/material";

interface MarkdownProps {
  children: string;
  components?: Components;
  variant?: "plain" | "subtitle";
}

const subtitleComponents: Components = {
  p({ children }) {
    return (
      <Typography variant="subtitle2" sx={{ my: 2, whiteSpace: "pre-line" }}>
        {children}
      </Typography>
    );
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
