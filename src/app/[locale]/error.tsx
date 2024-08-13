"use client";

import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import DecoratorPanel from "@/modules/DecoratorPanel";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <DecoratorPanel>
      <OverlayCenterAlert>{error.message}</OverlayCenterAlert>
    </DecoratorPanel>
  );
}
