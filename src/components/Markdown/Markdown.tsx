import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import FormControlDescription from "../FormControlDescription";
import { Typography } from "@mui/material";

interface MarkdownProps {
  children: string;
  components?: Components;
  variant?: "plain" | "subtitle" | "legal";
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

const legalComponents: Components = {
  h1({ node: _node, children, ...rest }) {
    return (
      <h3 style={{ fontWeight: "bold" }} {...rest}>
        {children}
      </h3>
    );
  },
  h2({ node: _node, children, ...rest }) {
    return (
      <h4 style={{ fontWeight: "normal" }} {...rest}>
        {children}
      </h4>
    );
  },

  h3({ node: _node, children, ...rest }) {
    return (
      <p style={{ marginLeft: "20px" }} {...rest}>
        <Typography>{children}</Typography>
      </p>
    );
  },
};

export default function Markdown({
  children,
  variant = "plain",
  ...props
}: MarkdownProps) {
  let selectedComponents: Components;
  switch (variant) {
    case "subtitle":
      selectedComponents = {
        ...defaultComponents,
        ...subtitleComponents,
      };
      break;
    case "legal":
      selectedComponents = {
        ...defaultComponents,
        ...legalComponents,
      };
      break;
    default:
      selectedComponents = {
        ...defaultComponents,
      };
  }

  return (
    <ReactMarkdown components={selectedComponents} {...props}>
      {children}
    </ReactMarkdown>
  );
}
