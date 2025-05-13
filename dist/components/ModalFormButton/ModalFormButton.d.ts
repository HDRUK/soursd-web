import { ReactNode } from "react";
interface ModalFormButtonProps {
    buttonText?: string;
    formContent: (props: {
        closeModal: () => void;
        onSubmit?: () => void;
        isLoading?: boolean;
    }) => ReactNode;
    onSubmit?: () => void;
    isLoading?: boolean;
    tooltipText?: string;
    icon?: ReactNode;
}
declare const ModalFormButton: ({ buttonText, formContent, onSubmit, isLoading, icon, tooltipText, }: ModalFormButtonProps) => import("react/jsx-runtime").JSX.Element;
export default ModalFormButton;
