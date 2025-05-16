import { PostTrainingsPayload } from "../../services/trainings/types";
import { File as ApplicationFile, ResearcherTraining } from "@/types/application";
export interface TrainingFormValues {
    provider: string;
    training_name: string;
    awarded_at: string;
    expires_at: string;
    certification_upload?: ApplicationFile;
}
interface TrainingFormProps {
    onSubmit: (values: PostTrainingsPayload) => void;
    isPending: boolean;
    onCancel: () => void;
    initialValues?: ResearcherTraining;
}
export default function TrainingForm({ onSubmit, isPending, onCancel, initialValues, }: TrainingFormProps): import("react/jsx-runtime").JSX.Element;
export {};
