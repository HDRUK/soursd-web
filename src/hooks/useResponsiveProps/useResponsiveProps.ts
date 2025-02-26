import { Breakpoint } from "@mui/material";
import useBreakpointsUp from "../useBreakpointsUp";

export type ResponsiveProps<T> = Record<
  keyof T & {},
  Record<Breakpoint, T[keyof T]>
>;

export default function useResponsiveProps<T>(
  responsiveProps: ResponsiveProps<T>
) {
  const { isXs, isSm, isMd, isLg, isXl } = useBreakpointsUp();

  const props = Object.keys(responsiveProps).reduce(
    (previous: Partial<T>, key: keyof T) => {
      let currentBreakpoint = "";

      if (isXs && responsiveProps[key]["xs"]) {
        currentBreakpoint = "xs";
      }

      if (isSm && responsiveProps[key]["sm"]) {
        currentBreakpoint = "sm";
      }

      if (isMd && responsiveProps[key]["md"]) {
        currentBreakpoint = "md";
      }

      if (isLg && responsiveProps[key]["lg"]) {
        currentBreakpoint = "lg";
      }

      if (isXl && responsiveProps[key]["xl"]) {
        currentBreakpoint = "xl";
      }

      const value =
        currentBreakpoint &&
        responsiveProps[key]?.[currentBreakpoint as Breakpoint];

      if (value) {
        previous[key] = value;
      }

      return previous;
    },
    {}
  );

  console.log("props", props);

  return props as T;
}
