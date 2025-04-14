"use client";

import { Box, Popover } from "@mui/material";
import { BoxProps } from "@mui/system";
import { useEffect, useRef, useState } from "react";

export type CopyableProps = BoxProps;

export default function Text({ children, sx, ...restProps }: CopyableProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const textRef = useRef();

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
        anchorEl={textRef?.current}
        open={hasCopied}
        onClose={() => {
          setHasCopied(false);
        }}>
        Copied to clipboard
      </Popover>
      <Box
        ref={textRef}
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
