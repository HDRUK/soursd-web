import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Preview } from "@storybook/react";
import ThemeRegistry from "../src/components/ThemeRegistry/ThemeRegistry";

export const withMuiTheme = Story => (
  <ThemeRegistry>
    <CssBaseline />
    <Story />
  </ThemeRegistry>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withMuiTheme],
};

export default preview;
