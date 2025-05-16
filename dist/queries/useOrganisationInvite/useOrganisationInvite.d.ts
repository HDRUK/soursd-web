import { PostOrganisationUnclaimedPayload } from "../../services/organisations";
interface UseOrganisationInviteProps {
    onSuccess: () => void;
    onError: () => void;
}
export default function useOrganisationInvite({ onSuccess, onError, }: UseOrganisationInviteProps): {
    queryState: {
        isLoading: boolean;
        isError: boolean;
        error: Error[];
        isFetched: boolean;
        isSuccess: boolean;
    };
    handleSubmit: (organisation: PostOrganisationUnclaimedPayload) => Promise<void>;
};
export {};
