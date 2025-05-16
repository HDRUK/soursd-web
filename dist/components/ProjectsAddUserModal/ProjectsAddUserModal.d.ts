import { FormModalProps } from "../FormModal";
interface ProjectsAddUserModaProps extends Omit<FormModalProps, "children"> {
    request: boolean;
    projectId: number;
    onClose: () => void;
}
export default function ProjectsAddUserModal({ request, projectId, onClose, ...restProps }: ProjectsAddUserModaProps): import("react/jsx-runtime").JSX.Element;
export {};
