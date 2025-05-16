import { ValidationLogAction } from "../../services/validation_logs/types";
export interface ActionValidationCommentFormData {
    comment: string;
}
interface ActionValidationCommentFormProps {
    onSubmit: (data: ActionValidationCommentFormData) => void;
    isLoading?: boolean;
    selectedAction: ValidationLogAction;
    setSelectedAction: React.Dispatch<React.SetStateAction<ValidationLogAction | null>>;
}
export default function ActionValidationCommentForm({ onSubmit, isLoading, selectedAction, setSelectedAction, }: ActionValidationCommentFormProps): import("react/jsx-runtime").JSX.Element;
export {};
