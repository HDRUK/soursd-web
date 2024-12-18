import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: JSX.Element;
};

const AppRouterContextProviderMock = ({
  router,
  children,
}: AppRouterContextProviderMockProps): JSX.Element => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  };
  return (
    <AppRouterContext.Provider value={mockedRouter}>
      {children}
    </AppRouterContext.Provider>
  );
};

export default AppRouterContextProviderMock;
