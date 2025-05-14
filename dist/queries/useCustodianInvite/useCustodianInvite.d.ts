import { PostCustodianPayload } from "@/services/custodians";
interface UseCustodianInviteProps {
    onSuccess: () => void;
    onError: () => void;
}
export default function useCustodianInvite({ onSuccess, onError, }: UseCustodianInviteProps): {
    queryState: any;
    handleSubmit: (custodian: PostCustodianPayload) => Promise<void>;
};
export {};
