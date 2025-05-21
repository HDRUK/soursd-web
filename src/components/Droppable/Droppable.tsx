import { useDroppable } from "@dnd-kit/core";
import { Box, BoxProps } from "@mui/material";

interface DroppableProps extends BoxProps {
  id: string;
}

export default function Droppable({
  children,
  id,
  ...restProps
}: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box
      ref={setNodeRef}
      {...restProps}
      sx={{
        borderTop: isOver ? "2px solid green" : undefined,
        height: "100%",
        ...restProps.sx,
      }}>
      {children}
    </Box>
  );
}
