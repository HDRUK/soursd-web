import { ResearcherProfessionalRegistration } from "@/types/application";
import { MutationState } from "@/types/form";
export interface ProfessionalRegistrationsFormProps {
    onSubmit: (professionalRegistration: ResearcherProfessionalRegistration) => void;
    queryState: MutationState;
    onClose: () => void;
    data?: ResearcherProfessionalRegistration;
    isEdit: boolean;
}
export default function ProfessionalRegistrationsForm({ onSubmit, onClose, queryState, data, isEdit, }: ProfessionalRegistrationsFormProps): import("react/jsx-runtime").JSX.Element;
