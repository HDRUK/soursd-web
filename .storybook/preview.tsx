import messages from "@/config/locales/en.json";
import type { Preview, StoryFn } from "@storybook/nextjs";
import { NextIntlClientProvider } from "next-intl";
import ThemeRegistry from "../src/components/ThemeRegistry/ThemeRegistry";

export const withMuiTheme = (Story: StoryFn) => {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeRegistry>
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
      expanded: true,
    },
  },
  decorators: [withMuiTheme],
};

export default preview;
