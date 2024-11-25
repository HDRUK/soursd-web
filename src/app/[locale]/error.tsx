"use client";

import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import PageContainer from "@/modules/PageContainer";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <PageContainer>
      <OverlayCenterAlert>{error.message}</OverlayCenterAlert>
    </PageContainer>
  );
}
