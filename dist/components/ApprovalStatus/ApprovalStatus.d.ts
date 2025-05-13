import { ReactNode } from "react";
interface PermissionsStatusProps {
    children: ReactNode;
    isApproved?: boolean;
}
export default function PermissionsStatus({ isApproved, children, }: PermissionsStatusProps): import("react/jsx-runtime").JSX.Element;
export {};
