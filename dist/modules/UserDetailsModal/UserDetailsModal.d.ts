import { Organisation, User } from "@/types/application";
interface UserDetailsModalProps {
    isApproved: boolean;
    user: User;
    organisation: Organisation;
    open?: boolean;
    onClose(): void;
}
export default function UserDetailsModal({ isApproved, user, organisation, open, onClose, }: UserDetailsModalProps): import("react/jsx-runtime").JSX.Element;
export {};
