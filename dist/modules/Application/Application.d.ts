import { User } from "@/types/application";
import { ReactNode } from "react";
interface ApplicationProps {
    children: ReactNode;
    custodianId?: number;
    organisationId?: number;
    me?: User;
}
export default function Application({ children, me, custodianId, organisationId, }: ApplicationProps): import("react/jsx-runtime").JSX.Element;
export {};
