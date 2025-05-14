import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import { ResearcherProfessionalRegistration } from "@/types/application";
import { MutationState, QueryState } from "@/types/form";
interface ProfessionalRegistrationsFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (fields: PostProfessionalRegistrationPayload & ResearcherProfessionalRegistration) => Promise<void>;
    queryState: QueryState | MutationState;
    initialValues?: ResearcherProfessionalRegistration;
    isEdit: boolean;
}
export default function ProfessionalRegistrationsFormModal({ open, onSubmit, onClose, queryState, initialValues, isEdit, }: ProfessionalRegistrationsFormModalProps): import("react/jsx-runtime").JSX.Element;
export {};
