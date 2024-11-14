"use client";

import { ReactNode } from "react";
import SourcdLogo from "../SourcdLogo";
import Text, { TextProps } from "../Text";

export interface GuidanceTitleProps extends TextProps {
  infoTitleIcon?: ReactNode;
}

export default function GuidanceTitle({
  children,
  infoTitleIcon,
  ...restProps
}: GuidanceTitleProps) {
  return (
    <Text
      variant="h3"
      startIcon={
        infoTitleIcon || <SourcdLogo sx={{ backgroundColor: "transparent" }} />
      }
      sx={{
        textAlign: "right",
        display: "flex",
        justifyContent: "flex-end",
        mb: 4,
      }}
      {...restProps}>
      {children}
    </Text>
  );
}
