import { colorToRgba, getPaletteModeColors } from "@/utils/theme";
import {
  AugmentedColorPaletteOptions,
  Box,
  Theme,
  css,
  styled,
} from "@mui/material";

export const StyledLoader = styled(Box)(({
  theme,
  color,
}: {
  theme: Theme;
  color: AugmentedColorPaletteOptions;
}) => {
  const bondColor = colorToRgba(
    getPaletteModeColors(theme, color).mode || "#fff",
    0.4
  );

  return css`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-content: center;
    width: 40px;
    height: 20px;

    .dot {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-content: center;
      margin: 0 5px;
      height: 20px;
      width: 2px;
    }

    .dot:first-of-type {
      margin-left: 0;
    }

    .dot:last-of-type {
      margin-right: 0;
    }

    .dot::before,
    .dot::after {
      content: "";
      position: absolute;
      bottom: -5px;
      display: block;
      width: 4px;
      height: 4px;
      background: ${getPaletteModeColors(theme, color).mode};
      border-radius: 4px;
      box-shadow: 1px 1px 4px ${bondColor};
      animation: helix 1.25s ease-in-out infinite;
    }

    .dot::after {
      bottom: 100%;
      animation: helix-reversed 1.25s ease-in-out infinite;
    }

    .dot i {
      position: absolute;
      z-index: 25;
      align-self: center;
      width: 2px;
      height: 10px;
      background: ${bondColor};
      animation: helix-bar 1.25s ease-in-out infinite;
    }

    .dot2::before,
    .dot2::after,
    .dot2 i {
      animation-delay: 0.1s;
    }

    .dot3::before,
    .dot3::after,
    .dot3 i {
      animation-delay: 0.2s;
    }

    .dot4::before,
    .dot4::after,
    .dot4 i {
      animation-delay: 0.3s;
    }

    .dot5::before,
    .dot5::after,
    .dot5 i {
      animation-delay: 0.4s;
    }

    .dot6::before,
    .dot6::after,
    .dot6 i {
      animation-delay: 0.5s;
    }

    @keyframes helix {
      0% {
        width: 5px;
        height: 5px;
        bottom: -5px;
        z-index: 10;
      }
      25% {
        width: 2px;
        height: 2px;
      }
      50% {
        width: 5px;
        height: 5px;
        bottom: 100%;
        z-index: 20;
      }
      75% {
        width: 8px;
        height: 8px;
      }
      100% {
        width: 5px;
        height: 5px;
        bottom: -5px;
      }
    }

    @keyframes helix-reversed {
      0% {
        width: 5px;
        height: 5px;
        bottom: 100%;
        z-index: 20;
      }
      25% {
        width: 8px;
        height: 8px;
      }
      50% {
        width: 5px;
        height: 5px;
        bottom: -5px;
        z-index: 10;
      }
      75% {
        width: 2px;
        height: 2px;
      }
      100% {
        width: 5px;
        height: 5px;
        bottom: 100%;
      }
    }

    @keyframes helix-bar {
      0% {
        height: 15px;
      }
      25% {
        height: 8px;
      }
      50% {
        height: 15px;
      }
      75% {
        height: 8px;
      }
      100% {
        height: 15px;
      }
    }
  `;
});
