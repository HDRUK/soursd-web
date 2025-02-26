import { Breakpoint, useTheme } from "@mui/material";
import useBreakpoint from "../useBreakpoint";

type ResponsiveProps<T> = Record<keyof T & {}, Record<Breakpoint, T[keyof T]>>;

export default function useResponsiveProps<T>(
  responsiveProps: ResponsiveProps<T>
) {
  const breakpoint = useBreakpoint();

  const props = Object.keys(responsiveProps).reduce(
    (previous: Partial<T>, key: keyof T) => {
      const value = breakpoint && responsiveProps[key]?.[breakpoint];

      if (value) {
        previous[key] = value;
      }
    },
    {}
  );

  return props;
}
