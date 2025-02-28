import usePathServerSide from "@/hooks/usePathServerSide";
import { PageContainer } from "@/modules";
import ProtectedRoute from "@/modules/ProtectedRoute";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathServerSide();

  return (
    <ProtectedRoute pathname={pathname}>
      {() => <PageContainer>{children}</PageContainer>}
    </ProtectedRoute>
  );
}
