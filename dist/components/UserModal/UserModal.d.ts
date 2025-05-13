import { FormModalProps } from "@/components/FormModal";
import { Organisation } from "@/types/application";
export interface UserModalProps extends Omit<FormModalProps, "children"> {
    organisation: Organisation;
    onClose: () => void;
}
export default function UsersModal({ organisation, onClose, ...restProps }: UserModalProps): import("react/jsx-runtime").JSX.Element;
