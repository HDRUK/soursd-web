import {
  AugmentedColorPaletteOptions,
  BoxProps,
  useTheme,
} from "@mui/material";
import { StyledLoader } from "./Loader.styles";

export interface LoaderProps extends BoxProps {
  color?: AugmentedColorPaletteOptions;
}

export default function Loader({
  color = "default",
  ...restProps
}: LoaderProps) {
  const theme = useTheme();

  return (
    <StyledLoader
      theme={theme}
      color={color}
      role="alert"
      aria-busy="true"
      {...restProps}>
      <div className="dot dot1">
        <i />
      </div>
      <div className="dot dot2">
        <i />
      </div>
      <div className="dot dot3">
        <i />
      </div>
      <div className="dot dot4">
        <i />
      </div>
      <div className="dot dot5">
        <i />
      </div>
      <div className="dot dot6">
        <i />
      </div>
    </StyledLoader>
  );
}
