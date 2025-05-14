import { FormProps } from "@/components/Form";
import { ResearcherProject } from "@/types/application";
import { MutationState } from "@/types/form";
export interface UserModalDetailsProps extends FormProps<ResearcherProject> {
    mutateState: MutationState;
    project: ResearcherProject;
}
export default function UserModalDetails({ mutateState, ...restProps }: UserModalDetailsProps): import("react/jsx-runtime").JSX.Element;
