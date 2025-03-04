import { getElementHeightWithMargins } from "@/utils/dom";
import { Box, Button, Collapse, CollapseProps } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ActionsPanelItemProps extends CollapseProps {
  collapseNumRows: number;
  actions?: ({ onClick }: { onClick: () => void }) => ReactNode;
}

export default function ActionsPanelItem({
  actions,
  children,
  collapseNumRows = 1,
}: ActionsPanelItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (ref.current) {
      const elements = ref.current.querySelectorAll(":scope > div > *");
      let initialHeight = 0;

      if (collapseNumRows < elements.length) {
        Array.from(elements)
          .slice(0, collapseNumRows)
          .forEach(element => {
            initialHeight += getElementHeightWithMargins(
              element as HTMLElement
            );
          });
        setHeight(initialHeight + 10);
        setHasMoreItems(true);
      } else {
        setHasMoreItems(false);
      }
    } else {
      setHasMoreItems(false);
    }
  }, []);

  return (
    <div>
      {hasMoreItems ? (
        <Collapse collapsedSize={height} in={expanded}>
          <div ref={ref}>{children}</div>
        </Collapse>
      ) : (
        children
      )}
      {hasMoreItems &&
        (actions?.({
          onClick: handleExpandCollapse,
        }) || (
          <Box sx={{ mt: 4 }}>
            <Button variant="text" onClick={handleExpandCollapse}>
              View all
            </Button>
          </Box>
        ))}
    </div>
  );
}
