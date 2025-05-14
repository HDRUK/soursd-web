import { Breakpoint } from "@mui/material";
export type ResponsiveProps<T> = Record<keyof T & {}, Record<Breakpoint, T[keyof T]>>;
export default function useResponsiveProps<T>(responsiveProps: ResponsiveProps<T>): T;
