import useApplicationRedirects from "@/hooks/useApplicationRedirects";
import { RootLayout } from "@/organisms";
import ApplicationUser from "@/organisms/ApplicationUser";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  await useApplicationRedirects();

  return (
    <ApplicationUser>
      <RootLayout>{children}</RootLayout>
    </ApplicationUser>
  );
}
