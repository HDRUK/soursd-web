import { createServer, listen } from "@/mocks/server";
import { Footer, PageLayout } from "@/modules";
import type { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_MSW_SERVER === "true") {
  listen(createServer());
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
      <Footer />
    </PageLayout>
  );
}
