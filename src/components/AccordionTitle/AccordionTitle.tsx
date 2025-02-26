import { Box } from "@mui/system";
import { ReactNode } from "react";
import Text from "../Text";

export interface AccordionTitleProps {
  actions: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
}

export default function AccordionTitle({
  icon,
  actions,
  children,
}: AccordionTitleProps) {
  const handleStopPropagation = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        width: "100%",
      }}>
      <Text startIcon={icon} sx={{ flexGrow: 1 }}>
        {children}
      </Text>
      <div
        role="presentation"
        onClick={handleStopPropagation}
        onKeyDown={handleStopPropagation}>
        {actions}
      </div>
    </Box>
  );
}
