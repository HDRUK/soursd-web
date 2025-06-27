"use client";

import { ReactNode } from "react";
import useFeature from "../../hooks/useFeature";
import { FeatureIds } from "../../types/roles";

export interface FeatureProps {
  id: FeatureIds;
  children: ReactNode;
}

export default function Feature({ id, children }: FeatureProps) {
  const { isTransitionAllowed } = useFeature(id);

  return isTransitionAllowed ? children : null;
}
