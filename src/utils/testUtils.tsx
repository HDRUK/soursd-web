import messages from "@/config/locales/en.json";
import theme from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import {
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
  RenderResult,
  render,
  renderHook,
} from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import React, { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <AppCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
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

const customRender = (
  ui: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >,
  options?: OptionProps
): RenderResult => {
  const { wrapperProps, ...rest } = options || {};

  return render(ui, {
    wrapper: props => <Wrapper {...props} {...wrapperProps} />,
    ...rest,
  });
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

export { customRender as render, customRenderHook as renderHook };
