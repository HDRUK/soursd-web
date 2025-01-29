import { ReactNode } from "react";
import { PageContainer } from "@/modules";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string; tabId: string };
}) {
  const { tabId } = params;

  return (
    <PageContainer>
      <TabsSections />
      {children}
    </PageContainer>
  );
}
