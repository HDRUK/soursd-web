import { ReactNode } from "react";
import { PageContainer } from "@/modules";
import TabsSections from "./components/TabsSections";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <TabsSections />
      {children}
    </PageContainer>
  );
}
