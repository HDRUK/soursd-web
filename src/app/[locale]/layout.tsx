import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { locales } from "@/config";
import { NotificationsProvider } from "@/context/Notifications";
import ToastProvider from "@/context/ToastProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import GlobalStyles from "@mui/material/GlobalStyles";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
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

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <NotificationsProvider>
              <ReactQueryClientProvider>
                <ThemeRegistry>
                  <ToastProvider>
                    <GlobalStyles
                      styles={{
                        [".MuiGrid-item .MuiGrid-container"]: {
                          maxWidth: "initial",
                        },
                      }}
                    />
                    {children}
                  </ToastProvider>
                </ThemeRegistry>
              </ReactQueryClientProvider>
            </NotificationsProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
