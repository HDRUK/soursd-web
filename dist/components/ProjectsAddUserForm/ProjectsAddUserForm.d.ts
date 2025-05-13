import { ProjectAllUser } from "@/types/application";
import { MutationState } from "@/types/form";
export type RowUserState = {
    user_digital_ident: string;
    project_role_id: number;
    affiliation_id: number;
}[];
interface ProjectsAddUserProps {
    projectId: number;
    mutationState: MutationState;
    onSave: (projectUsers: ProjectAllUser[]) => void;
}
export default function ProjectsAddUser({ projectId, onSave, mutationState, }: ProjectsAddUserProps): import("react/jsx-runtime").JSX.Element;
export {};
