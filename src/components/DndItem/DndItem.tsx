import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import React, { ReactNode, useEffect } from "react";

import { BoxProps } from "@mui/system";
import { StyledItem, StyledWrapper } from "./DndItem.styles";

export interface DndItemProps extends BoxProps {
  children: ReactNode;
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  index?: number;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  transition?: string | null;
}

const DndItem = React.forwardRef<HTMLLIElement, DndItemProps>(
  (
    {
      dragOverlay,
      dragging,
      disabled,
      index,
      listeners,
      transition,
      transform,
      children,
      ...restProps
    },
    ref
  ) => {
    useEffect(() => {
      if (!dragOverlay) {
        return;
      }

      document.body.style.cursor = "grabbing";

      return () => {
        document.body.style.cursor = "";
      };
    }, [dragOverlay]);

    return (
      <StyledWrapper
        sx={{
          transition: [transition].filter(Boolean).join(", "),
          "--translate-x": transform
            ? `${Math.round(transform.x)}px`
            : undefined,
          "--translate-y": transform
            ? `${Math.round(transform.y)}px`
            : undefined,
          "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
          "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
          "--index": index,
        }}
        ref={ref}>
        <StyledItem
          dragging={dragging}
          dragOverlay={dragOverlay}
          disabled={disabled}
          tabIndex={0}
          {...listeners}
          {...restProps}>
          {children}
        </StyledItem>
      </StyledWrapper>
    );
  }
);

export default DndItem;
