import { PostOrganisationUnclaimedPayload } from "../../services/organisations";
import { MutationState } from "@/types/form";
export interface InviteOrganisationFormProps {
    organisationId?: number;
    onSubmit: (organisation: PostOrganisationUnclaimedPayload) => void;
    queryState: MutationState;
}
export default function InviteOrganisationForm({ organisationId, onSubmit, queryState, }: InviteOrganisationFormProps): import("react/jsx-runtime").JSX.Element;
