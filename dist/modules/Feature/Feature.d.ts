import { FeatureIds } from "@/types/roles";
import { ReactNode } from "react";
export interface FeatureProps {
    id: FeatureIds;
    children: ReactNode;
}
export default function Feature({ id, children }: FeatureProps): ReactNode;
