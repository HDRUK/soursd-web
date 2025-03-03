import { useMediaQuery, useTheme } from "@mui/material";

export default function useBreakpoint() {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  };
}
