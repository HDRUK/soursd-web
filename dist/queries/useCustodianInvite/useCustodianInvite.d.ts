import { PostCustodianPayload } from "@/services/custodians";
interface UseCustodianInviteProps {
    onSuccess: () => void;
    onError: () => void;
}
export default function useCustodianInvite({ onSuccess, onError, }: UseCustodianInviteProps): {
    queryState: {
        isLoading: boolean;
        isError: boolean;
        error: Error[];
        isFetched: boolean;
        isSuccess: boolean;
    };
    handleSubmit: (custodian: PostCustodianPayload) => Promise<void>;
};
export {};
