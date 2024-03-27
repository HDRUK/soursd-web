import { makeServer } from "@/mocks/server";
import { Footer, PageLayout } from "@/modules";
import theme from "@/theme";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_MOCK_DEV_SERVER === "true") {
  makeServer({ environment: "development" });
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <ThemeProvider theme={theme}>
        <PageLayout>
          <Component {...pageProps} />
          <Footer />
        </PageLayout>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
