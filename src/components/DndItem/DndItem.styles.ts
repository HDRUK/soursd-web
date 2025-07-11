import { styled } from "@mui/material";
import { Box, css } from "@mui/system";

const StyledWrapper = styled(Box)(
  ({ dragOverlay }) => css`
    @keyframes pop {
      0% {
        transform: scale(1);
        box-shadow: var(--box-shadow);
      }
      100% {
        transform: scale(var(--scale));
        box-shadow: var(--box-shadow-picked-up);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    display: flex;
    box-sizing: border-box;
    transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0)
      scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1));
    transform-origin: 0 0;
    touch-action: manipulation;

    &.fadeIn {
      animation: fadeIn 500ms ease;
    }

    ${dragOverlay &&
    `
      --scale: 1.05;
      --box-shadow: $box-shadow;
      --box-shadow-picked-up: $box-shadow-border,
        -1px 0 15px 0 rgba(34, 33, 81, 0.01),
        0px 15px 15px 0 rgba(34, 33, 81, 0.25);
      z-index: 999;
    }`}
  `
);

const StyledItem = styled(Box)(
  ({
    dragging,
    dragOverlay,
    disabled,
  }: {
    dragging: boolean;
    dragOverlay: boolean;
    disabled: boolean;
  }) => css`
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    ${disabled &&
    `
      opacity: 0.6;
    `}
    box-shadow: $box-shadow;
    outline: none;
    border-radius: calc(4px / var(--scale-x, 1));
    box-sizing: border-box;
    list-style: none;
    transform-origin: 50% 50%;

    -webkit-tap-highlight-color: transparent;

    color: $text-color;
    font-weight: $font-weight;
    font-size: 1rem;
    white-space: nowrap;

    transform: scale(var(--scale, 1));
    transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);

    &:focus-visible {
      box-shadow:
        0 0px 4px 1px $focused-outline-color,
        $box-shadow;
    }

    ${dragging &&
    !dragOverlay &&
    `
      opacity: var(--dragging-opacity, 0.5);
      z-index: 0;

      &:focus {
        box-shadow: $box-shadow;
      }
      `}

    ${dragging &&
    `
      color: #999;
      background-color: #f1f1f1;
      &:focus {
        box-shadow:
          0 0px 4px 1px rgba(0, 0, 0, 0.1),
          $box-shadow;
      }
      cursor: not-allowed;
    `}

    ${dragOverlay &&
    `
      cursor: inherit;
      animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
      transform: scale(var(--scale));
      box-shadow: var(--box-shadow-picked-up);
      opacity: 1;
      transform: rotate(10deg);
    `}
  `
);

export { StyledWrapper, StyledItem };
