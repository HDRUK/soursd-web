"use client";

import useFeature from "../../hooks/useFeature";
import { FeatureIds } from "../../types/roles";
import { ReactNode } from "react";

export interface FeatureProps {
  id: FeatureIds;
  children: ReactNode;
}

export default function Feature({ id, children }: FeatureProps) {
  const { isAllowed } = useFeature(id);

  return isAllowed ? children : null;
}
