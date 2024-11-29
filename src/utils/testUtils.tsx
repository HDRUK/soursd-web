import ReactQueryClientProvider from "@/app/[locale]/components/ReactQueryClientProvider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import messages from "@/config/locales/en.json";
import { NotificationsProvider } from "@/context/Notifications";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import {
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
  RenderResult,
  render,
  renderHook,
} from "@testing-library/react";
import mediaQuery from "css-mediaquery";
import { NextIntlClientProvider } from "next-intl";
import React, { ReactNode } from "react";
import { CookieProvider } from "@/context/CookieContext/CookieContext";
import userEvent, { UserEvent } from "@testing-library/user-event";

const defineMatchMedia = (width: number) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: <T,>(query: T) => ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => {},
      removeListener: () => {},
    }),
  });
};

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <AppCacheProvider>
        <NotificationsProvider>
          <LocalizationProvider>
            <ReactQueryClientProvider>
              <ThemeRegistry>
                <CookieProvider>{children}</CookieProvider>
              </ThemeRegistry>
            </ReactQueryClientProvider>
          </LocalizationProvider>
        </NotificationsProvider>
      </AppCacheProvider>
    </NextIntlClientProvider>
  );
};

interface OptionProps
  extends RenderOptions<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > {
  wrapperProps: Record<string, unknown>;
}

interface UserRenderResults extends RenderResult {
  user: UserEvent;
}

const customRender = (
  ui: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >,
  options?: OptionProps
): UserRenderResults => {
  const { wrapperProps, ...rest } = options || {};

  return {
    ...render(ui, {
      wrapper: props => <Wrapper {...props} {...wrapperProps} />,
      ...rest,
    }),
    user: userEvent.setup(),
  };
};

interface OptionHookProps
  extends RenderHookOptions<
    unknown,
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > {
  wrapperProps: Record<string, unknown>;
}

const customRenderHook = (
  ui: (initialProps: unknown) => unknown,
  options?: OptionHookProps
): RenderHookResult<unknown, unknown> => {
  const { wrapperProps, ...rest } = options || {};
  return renderHook(ui, {
    wrapper: props => <Wrapper {...props} {...wrapperProps} />,
    ...rest,
  });
};

export * from "@testing-library/react";
export * from "@testing-library/user-event";

export {
  defineMatchMedia,
  customRender as render,
  customRenderHook as renderHook,
};
