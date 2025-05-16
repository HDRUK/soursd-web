import { FormProps } from "../components/Form";
import { ProjectDetails } from "@/types/application";
import { MutationState } from "@/types/form";
export interface ProjectsSafeDataFormProps extends Omit<FormProps<ProjectDetails>, "children"> {
    projectId?: number;
    mutateState?: MutationState;
}
export default function ProjectsSafeDataForm({ projectId, mutateState, ...restProps }: ProjectsSafeDataFormProps): import("react/jsx-runtime").JSX.Element;
