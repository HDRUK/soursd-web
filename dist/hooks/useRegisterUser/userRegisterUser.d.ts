import { AccountType } from "@/types/accounts";
interface UseRegisterUserArgs {
    selected: AccountType | null;
}
export default function useRegisterUser({ selected }: UseRegisterUserArgs): {
    isLoading: boolean;
    isError: boolean;
    error: Error[];
    isFetched: boolean;
    isSuccess: boolean;
    handleRegister: () => Promise<void>;
};
export {};
