import ReactQueryClientProvider from "@/app/[locale]/components/ReactQueryClientProvider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import messages from "@/config/locales/en.json";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import {
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
  RenderResult,
  act,
  render,
  renderHook,
} from "@testing-library/react";
import mediaQuery from "css-mediaquery";
import { NextIntlClientProvider } from "next-intl";
import React, { ReactNode } from "react";
import { CookieProvider } from "@/context/CookieContext";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <AppCacheProvider>
        <LocalizationProvider>
          <ReactQueryClientProvider>
            <ThemeRegistry>
              <CookieProvider>
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </CookieProvider>
            </ThemeRegistry>
          </ReactQueryClientProvider>
        </LocalizationProvider>
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

interface OptionHookProps<P = unknown>
  extends RenderHookOptions<
    P,
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > {
  wrapperProps?: Record<string, unknown>;
}

const customRenderHook = <P, R>(
  ui: (initialProps: P) => R,
  options?: OptionHookProps<P>
): RenderHookResult<R, P> => {
  const { wrapperProps, ...rest } = options || {};
  return renderHook(ui, {
    wrapper: props => <Wrapper {...props} {...wrapperProps} />,
    ...rest,
  });
};

const commonAccessibilityTests = async (rendered: RenderResult) => {
  const { container } = rendered;

  let results;

  await act(async () => {
    results = await axe(container);
  });

  expect(results).toHaveNoViolations();
};

export * from "@testing-library/react";
export * from "@testing-library/user-event";

export {
  defineMatchMedia,
  customRender as render,
  customRenderHook as renderHook,
  commonAccessibilityTests,
};
