import { makeServer } from "@/mocks/server";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_MOCK_DEV_SERVER === "true") {
  makeServer({ environment: "development" });
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Component {...pageProps} />
    </AppCacheProvider>
  );
}
