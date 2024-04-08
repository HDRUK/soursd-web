import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Preview } from "@storybook/react";
import ThemeRegistry from "../src/components/ThemeRegistry/ThemeRegistry";
import { NextIntlClientProvider, useMessages } from "next-intl";
import messages from "@/config/locales/en.json";

export const withMuiTheme = Story => {
  // const messages = useMessages();

  // console.log("Messages", messages);

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
