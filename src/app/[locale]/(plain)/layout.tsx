import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<object>;

export default function Layout({ children }: LayoutProps) {
  return <Box sx={{ height: "100vh", width: "100vw" }}>{children}</Box>;
}
