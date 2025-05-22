import React, { forwardRef } from "react";

import { Box, BoxProps } from "@mui/system";

export type DndContainerProps = BoxProps;

const DndContainer = forwardRef<HTMLDivElement, DndContainerProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <Box {...restProps} ref={ref}>
        {children}
      </Box>
    );
  }
);

export default DndContainer;
