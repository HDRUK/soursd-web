import { ReactNode } from "react";
import Droppable from "../Droppable";
import { Typography } from "@mui/material";

interface UsersBoardColumnProps {
  children: ReactNode;
  id: string;
  heading: ReactNode;
}

export default function UsersBoardColumn({
  children,
  id,
  heading,
}: UsersBoardColumnProps) {
  return (
    <Droppable
      id={id}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        background: "#F6F7F8",
        p: 1,
      }}>
      <Typography variant="h6">{heading}</Typography>
      {children}
    </Droppable>
  );
}
