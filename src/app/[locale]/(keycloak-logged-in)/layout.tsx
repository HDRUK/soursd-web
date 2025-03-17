import { PageContainer } from "@/modules";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return <PageContainer>{children}</PageContainer>;
}
