import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { locales } from "@/config";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { PropsWithChildren, useMemo } from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { NotificationsProvider } from "@/context/Notifications";
import "../global.css";
import ReactQueryClientProvider from "./components/ReactQueryClientProvider";
import { getRoutes } from "@/utils/router";

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

  const routes = useMemo(() => getRoutes(ROUTES, locale), [locale]);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <NotificationsProvider>
              <ReactQueryClientProvider>
                <ThemeRegistry>
                  <GlobalStyles
                    styles={{
                      [".MuiGrid-item .MuiGrid-container"]: {
                        maxWidth: "initial",
                      },
                    }}
                  />
                  <ApplicationDataProvider
                    value={{
                      routes,
                      systemConfigData: {},
                    }}>
                    {children}
                  </ApplicationDataProvider>
                </ThemeRegistry>
              </ReactQueryClientProvider>
            </NotificationsProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
