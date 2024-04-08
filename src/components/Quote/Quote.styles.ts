import {
  PaletteColor,
  SimplePaletteColorOptions,
  css,
  styled,
} from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { Theme } from "@mui/system";

export const StyledImage = styled("div")(
  ({ theme }) => css`
    background: linear-gradient(
      to right,
      ${purple["200"]},
      ${theme.palette.primary.light}
    );
    padding: 2px;
    border-radius: 42px;
    width: 84px;
    height: 84px;
  `
);

export const StyledBlockquote = styled("blockquote")(
  ({
    theme,
    paletteColor,
  }: {
    theme: Theme;
    paletteColor: PaletteColor | SimplePaletteColorOptions;
  }) => css`
    background-color: ${paletteColor.main};
    color: ${paletteColor.contrastText};
    padding: ${theme.spacing(3)};
    margin: 0;
    display: flex;
    border: 1px solid ${grey["300"]};
  `
);
