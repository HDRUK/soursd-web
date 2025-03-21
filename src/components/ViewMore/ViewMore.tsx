import { Box, Button, CollapseProps } from "@mui/material";
import React, { ReactNode, useState } from "react";

interface ViewMoreProps extends CollapseProps {
  collapseNumRows: number;
  actions?: ({ onClick }: { onClick: () => void }) => ReactNode;
}

export default function ViewMore({
  actions,
  children,
  collapseNumRows = 1,
}: ViewMoreProps) {
  const childArray = React.Children.toArray(children);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const visibleChildren = expanded
    ? childArray
    : childArray.slice(0, collapseNumRows);
  const hasMoreItems = childArray.length > collapseNumRows;

  return (
    <Box
      data-testid="view-more-box"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {visibleChildren}
      {hasMoreItems &&
        (actions?.({
          onClick: toggleExpand,
        }) || (
          <Box sx={{ mt: 1 }}>
            <Button
              data-testid="view-more-button"
              variant="text"
              onClick={toggleExpand}>
              {expanded ? "View Less" : "View All"}
            </Button>
          </Box>
        ))}
    </Box>
  );
}
