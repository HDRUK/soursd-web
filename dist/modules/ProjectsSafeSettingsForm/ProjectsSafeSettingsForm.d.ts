import { FormProps } from "@/components/Form";
import { ProjectDetails } from "@/types/application";
import { MutationState } from "@/types/form";
export interface ProjectSafeProjectFormProps extends Omit<FormProps<ProjectDetails>, "children"> {
    projectId?: number;
    mutateState?: MutationState;
}
export default function ProjectSafeSettingsForm({ projectId, mutateState, ...restProps }: ProjectSafeProjectFormProps): import("react/jsx-runtime").JSX.Element;
