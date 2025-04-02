"use client";

import { Popover, Typography, TypographyProps } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { renderToString } from "react-dom/server";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Copyable from "../Copyable";

export interface TextProps extends Omit<TypographyProps, "onCopy"> {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconSize?: string;
  copyable?: boolean;
  onCopy?: (text: string) => void;
}

export default function Text({
  children,
  startIcon,
  endIcon,
  sx,
  variant,
  iconSize = "1.25em",
  copyable,
  onCopy,
  ...restProps
}: TextProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLSpanElement>) => {
    const text = (e.target as HTMLSpanElement).innerText;

    window.navigator.clipboard.writeText(text);

    setHasCopied(true);
    onCopy?.(text);
  };

  const copyText = (text: string) => {
    return;
  };

  useEffect(() => {
    let timeout;

    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hasCopied]);

  return (
    <Typography
      {...restProps}
      variant={variant}
      sx={{
        display: variant === "caption" ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 0.5,
        ["> svg, img"]: {
          fontSize: iconSize,
          height: iconSize,
          width: iconSize,
        },
        ...(copyable && {
          textDecoration: "underline",
          cursor: "pointer",
        }),
        ...sx,
      }}>
      {startIcon}
      {copyable ? <Copyable>{children}</Copyable> : children}
      {endIcon || (copyable && <ContentCopyIcon />)}
    </Typography>
  );
}
