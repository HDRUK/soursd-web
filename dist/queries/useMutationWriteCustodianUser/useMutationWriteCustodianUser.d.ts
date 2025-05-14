import { CustodianUser } from "@/types/application";
interface UseMutationCustodianWriteUserOptions {
    user: CustodianUser;
    custodianId: number;
}
export default function useMutationWriteCustodianUser({ user, custodianId: custodian_id, }: UseMutationCustodianWriteUserOptions): import("@tanstack/react-query").UseMutationResult<unknown, Error, Pick<CustodianUser, "id" | "email" | "permissions" | "first_name" | "last_name">, unknown>;
export {};
