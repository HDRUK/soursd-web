import { Auth } from "@/types/application";
export default function useAuth(): {
    user: Auth | undefined;
    loading: boolean;
};
