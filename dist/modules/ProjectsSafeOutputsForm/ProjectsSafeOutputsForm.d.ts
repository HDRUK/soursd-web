import { FormProps } from "@/components/Form";
import { ProjectDetails } from "@/types/application";
import { MutationState } from "@/types/form";
export interface ProjectsSafeOutputsFormFieldValues {
    data_assets: string;
    research_outputs: string[];
}
export interface ProjectsSafeOutputsFormProps extends Omit<FormProps<ProjectDetails>, "children"> {
    projectId?: number;
    mutateState?: MutationState;
}
export default function ProjectsSafeOutputsForm({ projectId, mutateState, ...restProps }: ProjectsSafeOutputsFormProps): import("react/jsx-runtime").JSX.Element;
