import { FormModalProps } from "../FormModal";
export interface TermsAndConditionsModalProps extends Omit<FormModalProps, "children"> {
    accountType: string | null;
    onAccept: () => void;
    onDecline: () => void;
}
export default function TermsAndConditionsModal({ accountType, onAccept, onDecline, ...restProps }: TermsAndConditionsModalProps): import("react/jsx-runtime").JSX.Element;
