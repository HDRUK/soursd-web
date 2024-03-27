import { makeServer } from "@/mocks/server";
import { Footer, PageLayout } from "@/modules";
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_MOCK_DEV_SERVER === "true") {
  makeServer({ environment: "development" });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
      <Footer />
    </PageLayout>
  );
}
