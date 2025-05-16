import { PostUserInvitePayload } from "../../services/users";
import { MutationState } from "@/types/form";
export interface InviteUserFormProps {
    onSubmit: (user: PostUserInvitePayload) => void;
    queryState: MutationState;
}
export default function InviteUserForm({ onSubmit, queryState, }: InviteUserFormProps): import("react/jsx-runtime").JSX.Element;
