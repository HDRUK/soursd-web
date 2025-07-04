import { Box, BoxProps } from "@mui/system";

export type KanbanBoardColumnsProps = BoxProps;

export default function KanbanBoardColumns({
  children,
  sx,
  ...restProps
}: KanbanBoardColumnsProps) {
  return (
    <Box
      sx={{
        display: "inline-grid",
        boxSizing: "border-box",
        gridAutoFlow: "column",
        gap: 2,
        overflow: "scroll",
        ...sx,
      }}
      {...restProps}>
      {children}
    </Box>
  );
}
