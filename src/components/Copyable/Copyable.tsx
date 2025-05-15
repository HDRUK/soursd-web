"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BoxProps } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export type CopyableProps = BoxProps;

const NAMESPACE_TRANSLATION = "Copyable";

export default function Copyable({
  children,
  sx,
  ...restProps
}: CopyableProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const [hasCopied, setHasCopied] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    const text = textRef.current?.innerText ?? "";

    if (text) {
      navigator.clipboard.writeText(text);
      setHasCopied(true);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (hasCopied) {
      timeout = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [hasCopied]);

  return (
    <Box
      ref={textRef}
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "default",
        userSelect: "text",
        ...sx,
      }}
      {...restProps}>
      {children}

      <Tooltip title={hasCopied ? t("caption") : t("copy")}>
        <IconButton size="small" onClick={handleCopy} sx={{ ml: 0.5, p: 0.5 }}>
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
