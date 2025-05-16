import { PostCustodianPayload } from "../../services/custodians";
import { MutationState } from "@/types/form";
export interface InviteCustodianFormProps {
    onSubmit: (custodian: PostCustodianPayload) => void;
    queryState: MutationState;
}
export default function InviteCustodianForm({ onSubmit, queryState, }: InviteCustodianFormProps): import("react/jsx-runtime").JSX.Element;
