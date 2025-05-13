import { ModalProps } from "@mui/material";
import { ReactNode } from "react";
export interface FormModalProps extends Omit<ModalProps, "children"> {
    children: ReactNode;
    heading?: ReactNode;
    description?: ReactNode;
    variant?: "form" | "content";
    isLoading?: boolean;
    isDismissable?: boolean;
    onBack?: () => void;
}
export default function FormModal({ children, isDismissable, isLoading, variant, onBack, onClose, sx, heading, description, ...restProps }: FormModalProps): import("react/jsx-runtime").JSX.Element;
