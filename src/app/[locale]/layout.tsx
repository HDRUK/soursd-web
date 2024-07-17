import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { locales } from "@/config";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { PropsWithChildren, useMemo } from "react";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { NotificationsProvider } from "@/context/Notifications";
import ToastProvider from "@/context/ToastProvider";
import "../global.css";
import ReactQueryClientProvider from "./components/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Researcher Registry",
  description: "Researcher Registry homepage",
};

type RootLayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  if (!locales[locale]) notFound();

  const messages = useMessages();

  const routes = useMemo(() => {
    const clonedRoutes = JSON.parse(JSON.stringify(ROUTES));

    (Object.keys(clonedRoutes) as Array<keyof typeof clonedRoutes>).forEach(
      key => {
        clonedRoutes[key].path = `/${locale}${clonedRoutes[key].path}`;
      }
    );

    return clonedRoutes;
  }, [locale]);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <ThemeRegistry>
              <ToastProvider>
                <NotificationsProvider>
                  <ReactQueryClientProvider>
                    <ApplicationDataProvider
                      value={{
                        routes,
                      }}>
                      {children}
                    </ApplicationDataProvider>
                  </ReactQueryClientProvider>
                </NotificationsProvider>
              </ToastProvider>
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
