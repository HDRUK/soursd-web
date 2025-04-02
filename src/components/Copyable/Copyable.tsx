"use client";

import { Box, Popover } from "@mui/material";
import { BoxProps } from "@mui/system";
import { useEffect, useState } from "react";

export type CopyableProps = BoxProps;

export default function Text({
  children,
  onCopy,
  sx,
  ...restProps
}: CopyableProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLSpanElement>) => {
    const text = (e.target as HTMLSpanElement).innerText;

    window.navigator.clipboard.writeText(text);

    setHasCopied(true);
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
    <>
      <Popover
        open={hasCopied}
        onClose={() => {
          setHasCopied(false);
        }}>
        Copied to clipboard
      </Popover>
      <Box
        component="span"
        {...restProps}
        onClick={handleCopy}
        sx={{
          textDecoration: "underline",
          cursor: "pointer",
          ...sx,
        }}>
        {children}
      </Box>
    </>
  );
}
