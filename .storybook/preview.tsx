import messages from "@/config/locales/en.json";
import { CssBaseline } from "@mui/material";
import type { Preview, StoryFn } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import ThemeRegistry from "../src/components/ThemeRegistry/ThemeRegistry";
import { JSX, ReactElement } from "react";

export const withMuiTheme = (Story: StoryFn) => {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeRegistry>
        <CssBaseline />
        <Story />
      </ThemeRegistry>
    </NextIntlClientProvider>
  );
};

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
