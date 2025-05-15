import { CustodianUser } from "@/types/application";
interface UseMutationCustodianWriteUserOptions {
    user: CustodianUser;
    custodianId: number;
}
export default function useMutationWriteCustodianUser({ user, custodianId: custodian_id, }: UseMutationCustodianWriteUserOptions): import("@tanstack/react-query").UseMutationResult<import("../../types/requests").ResponseJson<number>, Error, Pick<CustodianUser, "id" | "email" | "first_name" | "last_name" | "permissions">, unknown>;
export {};
