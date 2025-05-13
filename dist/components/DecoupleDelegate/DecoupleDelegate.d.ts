import { PatchUserPayload } from "@/services/users";
import { User } from "@/types/application";
interface DecoupleUserProps {
    user: User;
    onSuccess: () => void;
    payload: PatchUserPayload;
    namespace: string;
}
declare const DecoupleDelegate: ({ user, onSuccess, payload, namespace, }: DecoupleUserProps) => import("react/jsx-runtime").JSX.Element;
export default DecoupleDelegate;
