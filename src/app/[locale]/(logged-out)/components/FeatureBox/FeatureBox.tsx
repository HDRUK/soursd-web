import { ComponentType } from "react";
import { Box, Typography } from "@mui/material";
import Markdown from "@/components/Markdown";
import Icon from "@/components/Icon";

type IconProps = {
  style: object;
};

type ButtonProps = {
  StylableIcon: ComponentType<IconProps>;
  title: string;
  content: string;
};

export default function FeatureBox({
  StylableIcon,
  title,
  content,
}: ButtonProps) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", gap: "10px", mb: "24px" }}>
      <Icon>
        <StylableIcon style={{ fontSize: 72 }} />
      </Icon>
      <Box sx={{ mt: "6px" }}>
        <Typography variant="h4">{title}</Typography>
        <Box sx={{ color: "text.secondary" }}>
          <Markdown>{content}</Markdown>
        </Box>
      </Box>
    </Box>
  );
}
