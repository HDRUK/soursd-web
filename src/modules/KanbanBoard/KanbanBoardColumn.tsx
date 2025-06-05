import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box, BoxProps } from "@mui/system";
import { forwardRef, ReactNode } from "react";

export interface KanbanBoardColumnProps extends BoxProps {
  heading: ReactNode;
  dragOver: boolean;
  isDropAllowed?: boolean;
}

const KanbanBoardColumn = forwardRef<HTMLDivElement, KanbanBoardColumnProps>(
  (
    {
      children,
      sx,
      heading,
      dragOver,
      isDropAllowed,
      ...restProps
    }: KanbanBoardColumnProps,
    ref
  ) => {
    return (
      <Box
        {...restProps}
        ref={ref}
        sx={{
          padding: 1,
          backgroundColor: grey["100"],
          position: "relative",
          ...(dragOver &&
            isDropAllowed !== false && {
              backgroundColor: grey["200"],
              "&:before": {
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                borderTop: "2px solid",
                borderColor: "primary.main",
                content: '""',
              },
            }),
          ...(isDropAllowed === false && {
            opacity: 0.3,
          }),
          ...sx,
        }}>
        <Typography
          variant="h6"
          sx={{
            px: 1,
            my: 1,
            minHeight: "3.6rem",
            ...(dragOver &&
              isDropAllowed !== false && {
                color: "primary.main",
              }),
          }}>
          {heading}
        </Typography>
        <Box
          {...restProps}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          {children}
        </Box>
      </Box>
    );
  }
);

export default KanbanBoardColumn;
