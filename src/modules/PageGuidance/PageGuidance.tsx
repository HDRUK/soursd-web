import { Box } from "@mui/material";
import { ReactNode } from "react";
import Guidance, { GuidanceProps } from "../../components/Guidance";

interface PageGuidanceProps extends GuidanceProps {
  subTabs?: ReactNode;
  children: ReactNode;
}

export default function PageGuidance({
  subTabs,
  children,
  ...restProps
}: PageGuidanceProps) {
  return (
    <Guidance {...restProps}>
      {subTabs}
      <Box {...restProps} sx={{ pl: 0 }}>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </Guidance>
  );
}
