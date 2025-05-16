"use client";

import useResponsiveProps, {
  ResponsiveProps,
} from "../../hooks/useResponsiveProps";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export interface ULBaseProps extends BoxProps {
  children: ReactNode;
  separator?: string;
  variant: "vertical" | "horizontal";
}

export type ULProps = ULBaseProps & {
  responsiveProps: ResponsiveProps<ULBaseProps>;
};

export default function UL({
  separator = "|",
  variant = "vertical",
  children,
  responsiveProps,
  ...restProps
}: ULProps) {
  const props = useResponsiveProps(responsiveProps);
  const currentVariant = props.variant || variant;

  return (
    <Box
      component="ul"
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: currentVariant === "vertical" ? "column" : "row",
        listStyle: "none",
        p: 0,
        m: 0,
        gap: 1,
        ...(currentVariant === "horizontal" && {
          alignItems: "center",
          gap: 0,
          "> li": {
            p: "0 12px",
            position: "relative",
            "&:after": {
              position: "absolute",
              right: "-4px",
              top: "50%",
              transform: "translateY(-50%)",
              content: `"${separator}"`,
            },
            "&:first-child": {
              pl: 0,
            },
            "&:last-child:after": {
              content: '""',
            },
          },
        }),
        ...restProps?.sx,
      }}>
      {children}
    </Box>
  );
}
