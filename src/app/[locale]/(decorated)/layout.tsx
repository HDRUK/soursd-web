import useAuth from "@/hooks/useUser";
import { Footer, PageLayout } from "@/modules";
import Feature from "@/modules/Feature";
import Header from "@/modules/Header/Header";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

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
  const { isValid } = useAuth();

  if (!isValid) redirect(`/${locale}/403`);

  return (
    <PageLayout>
      <Header />
      {children}
      <Feature id="Footer">
        <Footer />
      </Feature>
    </PageLayout>
  );
}
