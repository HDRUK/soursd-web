import { PostOrganisationUnclaimedPayload } from "@/services/organisations";
interface UseOrganisationInviteProps {
    onSuccess: () => void;
    onError: () => void;
}
export default function useOrganisationInvite({ onSuccess, onError, }: UseOrganisationInviteProps): {
    queryState: any;
    handleSubmit: (organisation: PostOrganisationUnclaimedPayload) => Promise<void>;
};
export {};
